import { useEffect, useState } from 'react';


function getCookie(name: string) : string {
    const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            const ret = parts.pop()?.split(";").shift();
            if (ret) {
                return ret
            }
        }
    return ""
}

export default function GetUsername() {
    const [username, setUsername] = useState<string>("anonymous");
    const csrfToken = getCookie("csrf_access_token");

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/user', {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "X-CSRF-TOKEN": csrfToken,
                    },
                });
                const data = await response.json();
                setUsername(data.username)
            } catch (error) {
                console.error('Error when fetching username: ', error);
            }
    };
    fetchUsername();
}, []);

    return (
        <>{username}</>
    )
}