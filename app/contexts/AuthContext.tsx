import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
    useCallback,
} from "react";

import { authService } from "../../services/auth.service";
import type { User } from "~/interfaces/User";

import { isTokenExpired, getTokenExpiration } from "~/utils/jwt";

interface AuthContextData{
    isAuthenticated: boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
    const token = localStorage.getItem("token");

    setIsAuthenticated(token !== null);
    }, []);



    useEffect(()=>{
        const token = localStorage.getItem('token');

        if(token && isTokenExpired()){
            logout();
        }
    },[]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if(!token || !isAuthenticated){
            return;
        }

        const expiration = getTokenExpiration();


        if(!expiration){
            logout();
            return;
        }

        const timeout = expiration - Date.now();

        if(timeout <= 0){
            logout();
            return;

        }

        const timer = setTimeout(logout, timeout);

        return () => clearTimeout(timer);

    }, [isAuthenticated])

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const storedUser = JSON.parse( localStorage.getItem('user') ?? '{}');
        
        if(Object.keys(storedUser).length !== 0){
            setUser(storedUser);
        }     

    },[])

    useEffect(() =>{
        window.addEventListener('auth:logout', logout);

        return () =>{
            window.removeEventListener('auth:logout', logout);
        };
    }, []);


    const logout = useCallback((): void => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);

    }, []);

    async function login(email: string, password: string): Promise<void>{
        const response = await authService.login({
            email,
            password
        });

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        setIsAuthenticated(true);
        setUser(response.user);

        setIsAuthenticated(true);

        
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

