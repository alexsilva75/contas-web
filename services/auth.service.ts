import { api } from './api';

import type { User } from '~/interfaces/User';

export interface LoginDto{
    email: string;
    password: string;
}

interface LoginResponse{
    user: User;
    token: string;
    
}

export const authService = {
    async login(loginData: LoginDto): Promise<LoginResponse> {
        try {
            const response = await api('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            return response;
        } catch (error) {
            throw new Error('Erro ao realizar login');
        }
    }
}

