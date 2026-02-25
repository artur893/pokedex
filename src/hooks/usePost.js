import { useState } from "react";

function usePost(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function post(body) {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("POST error");
      } else {
        const json = await response.json();
        setData(json);
        return json;
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return { post, data, isLoading, isError };
}

export default usePost;
