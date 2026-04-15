import { useEffect, useState } from 'react';

interface data {
    username:string,
}

export default function GetUsername() {
    const [username, setUsername] = useState<String>("anonymous")

    useEffect(() => {
        const fetchUsername = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/user/1'); //sqlite starter alltid på 1 ikke 0
                const data = await response.json() as data;
                console.log(`Response's response: ${response}`);
                setUsername(data.username)
            } catch (error) {
                console.error('Error when fetching username: ', error);
            }
        }; fetchUsername();
    }, []); //forhindrer at funksjonen kjører hver render

    return (
        <>{username}</>
    )
}