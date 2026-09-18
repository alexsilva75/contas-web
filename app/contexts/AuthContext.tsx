import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
    useCallback,
} from "react";

import { authService } from "../services/auth.service";
import type { User } from "~/interfaces/User";

import { isTokenExpired, getTokenExpiration } from "~/utils/jwt";

interface AuthContextData{
    isAuthenticated: boolean | null;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [user, setUser] = useState<User | null>(null);

    const logout = useCallback((): void => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setIsAuthenticated(false);
        setUser(null);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem("token");
        const storedUser = localStorage.getItem("user");

        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        if (isTokenExpired()) {
            logout();
            return;
        }

        setIsAuthenticated(true);

        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

    }, [logout]);


    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        const expiration = getTokenExpiration();

        if (!expiration) {
            logout();
            return;
        }

        const timeout = expiration - Date.now();

        if (timeout <= 0) {
            logout();
            return;
        }

        const timer = setTimeout(logout, timeout);

        return () => clearTimeout(timer);

    }, [isAuthenticated, logout]);


    useEffect(() => {
        window.addEventListener("auth:logout", logout);

        return () => {
            window.removeEventListener("auth:logout", logout);
        };
    }, [logout]);


    async function login(email: string, password: string): Promise<void> {

        const response = await authService.login({
            email,
            password
        });

        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));

        setIsAuthenticated(true);
        setUser(response.user);

        console.log("Login realizado!");
    }


    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                login,
                logout,
                user,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextData{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

