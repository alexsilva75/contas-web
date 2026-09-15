export function isTokenExpired(): boolean{
    const expiration = localStorage.getItem('expiresAt');

    if(!expiration){
        return true;

    }

    return Number(expiration) <= Date.now();
}


export function getTokenExpiration(): number | null{
    const expiration = localStorage.getItem('expiresAt');
    return expiration ? Number(expiration) : null;
}