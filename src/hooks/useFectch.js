import { useState, useEffect, useRef } from 'react';

const useFetch = ({ url, method = 'GET', params = {}, body = null, token = null }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ref para el token, evitando que cambie entre renders
  const tokenRef = useRef(token);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const headers = {
          'Content-Type': 'application/json',
          ...(tokenRef.current && { Authorization: `Bearer ${tokenRef.current}` }),
        };

        const urlWithParams = new URL(url);
        Object.keys(params).forEach((key) =>
          urlWithParams.searchParams.append(key, params[key])
        );

        const response = await fetch(urlWithParams, {
          method,
          headers,
          body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Solo se ejecuta cuando `url`, `method` o `body` cambian, no `params` ni `token`
    fetchData();
  }, [url, method, body]); // No incluimos `params` ni `token` como dependencias

  return { data, loading, error };
};

export default useFetch;
