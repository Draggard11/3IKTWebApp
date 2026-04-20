import { useEffect, useState } from 'react';

export default function GetUsername() {
    const [username, setUsername] = useState<string>("anonymous");

    useEffect(() => {
    const fetchUsername = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/user', {
                credentials: 'include',
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            
            const data = await response.json();
            console.log('Parsed data:', data);         // ✅ log data, not response
            console.log('Username:', data.username);
            setUsername(data.username);
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