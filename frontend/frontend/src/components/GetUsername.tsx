import { useEffect, useState } from 'react';



export default function GetUsername() {
    const [username, setUsername] = useState<string>("anonymous");

    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            if (parts != undefined) {
                const ret = parts.pop() 
                if (ret != undefined) {
                    return ret.split(';').shift();
                }
            }
        }
        return "none"
    };

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/user', {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "X-CSRF-TOKEN": getCookie("csrf_access_token"),
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