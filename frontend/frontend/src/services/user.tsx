
export async function registerUser(username: string, password: string): Promise<Response> {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/register', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        if (!response.ok) {
            const errorData = await response.json();
            return Promise.reject(errorData.error || "");
        }
        return await response.json()
    } catch (err) {
        return Promise.reject(err)
    }
}


export async function loginUser(username: string, password: string) : Promise<Response> {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        })
        if (!response.ok) {
            const errorData = await response.json();
            return Promise.reject(errorData.error || 'Login failed');
        }
        return await response.json();
    } catch (err) {
        return Promise.reject(err)
    }
}