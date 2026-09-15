const API_URL = import.meta.env.API_URL;

export class ApiError extends Error{
    status;
    constructor(status, message){
        super(message);
        this.status = status;
        this.name = 'ApiError'
    }
}

const api = async (endpoint, options = {
   
}, auth = false) => {
    const { auth = true, ...fetchOptions } = options;

    const headers = new Headers(fetchOptions.headers);

    headers.set('Content-Type', 'application/json');
    headers.set('Accept', 'application/json');

    if(auth){
        const token = localStorage.getItem('access_token');

        if(token){
            
            headers.set('Authorization', `Bearer ${token}`);
        }

    }

    const response = await fetch(`/${API_URL}/${endpoint}`, {
        ...fetchOptions,
        headers,
    });

    if(!response.ok){
        let message = 'Ocorreu um erro na comunicação com o servidor';
        if(response.status === 401){
            window.dispatchEvent(new Event('auth:logout'));
        }

        try{
            const error = await response.json();

            if(typeof error.message === 'string'){
                message = error.message;
            }else if(Array.isArray(error.message)){
                message = error.join(', ');
            }
        }catch(error){
            throw new Error('Erro ao processar a resposta do servidor');

        }

        throw new ApiError(response.status, message);
    }

    if(response.status === 204){
        return undefined;
    }

    return response.json();

}

export default  api;