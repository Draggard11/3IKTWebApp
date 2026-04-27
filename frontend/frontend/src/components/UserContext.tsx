// UserContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext<string>("anonymous");

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("anonymous");

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/user", { credentials: "include" })
      .then(res => res.ok ? res.json() : { username: "anonymous" })
      .then(data => setUsername(data.username))
      .catch(() => setUsername("anonymous"));
  }, []);

  return <UserContext.Provider value={username}>{children}</UserContext.Provider>;
}

export const useUsername = () => useContext(UserContext);