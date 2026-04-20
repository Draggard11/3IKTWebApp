
export async function registerUser(username: string, password: string) {
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
            throw new Error('failed to register user')
        }
        return response
    } catch (err) {
        return err
    } finally {
        // 
    }
}


export async function loginUser(username: string, password: string) {
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
            credentials: "include"
        })

        if (!response.ok) {
            throw new Error('failed to post comment')
        }

        return response
    } catch (err) {
        // give error message to user
    } finally {
        // 
    }
}