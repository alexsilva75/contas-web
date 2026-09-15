export interface User {
    id: number;
    nome: string;
    email: string;
    email_verified_at?: Date | null;
    created_at?: Date | null;
    updated_at?: Date | null;
}