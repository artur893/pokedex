import { useState } from "react";

function useRequest() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function send(url, method, body) {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`${method} error`);
      }
      const json = await response.json();
      setData(json);
      return response.ok;
    } catch (error) {
      console.error(error);
      setIsError(true);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return { send, data, isLoading, isError };
}

export default useRequest;
