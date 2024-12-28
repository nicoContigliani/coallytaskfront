// fetchService.js

const fetchService = async ({ url, method = 'GET', params = {}, body = null, token = null }) => {
    const headers = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  
    // Construir la URL con parámetros de búsqueda
    const urlWithParams = new URL(url);
    Object.keys(params).forEach((key) =>
      urlWithParams.searchParams.append(key, params[key])
    );
  
    try {
      const response = await fetch(urlWithParams, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
  
      const result = await response.json();
      return { data: result, error: null };
    } catch (err) {
      return { data: null, error: err.message };
    }
  };
  
  export default fetchService;
  