import { useState } from "react";

function useLogin() {
  const [loggedUser, setLoggedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function login(identifier, password) {
    try {
      setIsLoading(true);
      setIsError(false);
      const loginRes = await fetch(
        `http://localhost:3001/users?login=${identifier}`,
      );
      const loginUser = await loginRes.json();
      const emailRes = await fetch(
        `http://localhost:3001/users?email=${identifier}`,
      );
      const emailUser = await emailRes.json();
      const userRecord = [...loginUser, ...emailUser][0];

      if (!userRecord) {
        return {
          ok: false,
          message: "Nie znaleziono użytkownika",
          variant: "error",
        };
      }
      if (userRecord.password !== password) {
        return {
          ok: false,
          message: "Hasło nieprawidłowe",
          variant: "error",
        };
      }
      setLoggedUser(userRecord);
      return {
        ok: true,
        message: "Pomyślnie zalogowano",
        variant: "success",
      };
    } catch (error) {
      console.error(error);
      setIsError(true);
      return {
        ok: false,
        message: error,
        variant: "error",
      };
    } finally {
      setIsLoading(false);
    }
  }
  return { login, loggedUser, isLoading, isError };
}

export default useLogin;
