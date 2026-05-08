// UserContext.tsx
import { createContext, useContext, useState, useEffect } from "react";

// UserContext.tsx
const UserContext = createContext<{ username: string | null; refreshUser: () => void }>({
  username: null,
  refreshUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);

  const refreshUser = () => {
    fetch("http://127.0.0.1:5000/api/user", { credentials: "include" })
      .then(res => res.ok ? res.json() : { username: null })
      .then(data => setUsername(data.username))
      .catch(() => setUsername(null));
  };

  useEffect(() => { refreshUser(); }, []);

  return (
    <UserContext.Provider value={{ username, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUsername = () => useContext(UserContext);