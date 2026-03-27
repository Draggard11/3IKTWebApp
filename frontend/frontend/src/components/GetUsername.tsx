import { useEffect, useState } from 'react';


export default function GetUsername() {
    const [username, setUsername] = useState<String>("anonymous")

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/user/0');
                const data = await response.json();
                console.log(`Response's response: ${response}`);
                setUsername(data.username)
            } catch (error) {
                console.error('Error when fetching username: ', error);
            }
        }; fetchUsername();
    })

    return (
        <> | {username} </>
    )
}