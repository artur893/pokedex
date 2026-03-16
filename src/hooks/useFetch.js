import { useEffect, useState, useCallback } from "react";

function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(url);
      if (response.status === 404) {
        setData(null);
        return;
      }
      if (!response.ok) {
        throw new Error("Network error");
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, isLoading, isError, refetch: fetchData };
}

export default useFetch;
