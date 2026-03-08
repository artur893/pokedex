import { createContext, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({ children }) {
  const [user, setUser] = useState({
    name: "asas",
    email: "as@as.as",
    password: "asAS12!@",
    id: 8,
  });

  return (
    <LoginContext.Provider value={{ user, setUser }}>
      {children}
    </LoginContext.Provider>
  );
}
