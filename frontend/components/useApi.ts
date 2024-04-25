import { useState, useEffect } from "react";

const fetchDemo = async (url: string) => {
  const obj = {
    json: () => {
      return {};
    },
    ok: false,
  };
  return obj;
};

function useApi(url: string) {
  const [data, setData] = useState<null | Object | Error>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // const response = await fetch(url);
        const response = await fetchDemo(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
      } catch (error: Error | any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [url]);

  return { data, isLoading, error };
}

export default useApi;
