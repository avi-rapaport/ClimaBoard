import { useEffect, useState } from 'react';

export function useAxios<T>(fetchAction: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (isMounted) {
        setLoading(true);
        setError(null);
      }

      try {
        const result = await fetchAction();
        if (isMounted) {
          setData(result);
        }
      } catch (error) {
        if (isMounted) {
          const erMsg =
            error instanceof Error ? error.message : 'an error occured';
          setError(erMsg);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [fetchAction]);

  return { data, loading, error };
}
