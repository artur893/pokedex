import { useState } from "react";
import { LoginContext } from "./ArenaContext";

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
