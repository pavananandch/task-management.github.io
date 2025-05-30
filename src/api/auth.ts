export const baseUrl = "http://localhost:3000/api";
interface RegisterInput {
    userName: string,
    password: string,
    email: string,
    mobile: string
}
export const login = async (userName: string, password:string): Promise<Response> => {
    try {
        const response = await fetch(`${baseUrl}/auth/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userName,
                    password
                })
            });
            return response;
    } catch (error) {
        return error as Response;
    }
}

export const register = async(payload: RegisterInput) => {
    try {
        const response = await fetch(`${baseUrl}/auth/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...payload
            })
        })
        return response;
    } catch (error) {
        return error as Response;
    }
}