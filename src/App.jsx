import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import fetchService from './services/fetchService';

function App() {

  // const { data, loading, error } = useFetch({
  //   url: 'http://localhost:5000/api/tasks',
  //   method: 'GET',
  //   params: { search: 'example' },
  //   token: 'your-token-here',
  // });
  // console.log("🚀 ~ App ~ data:", data)

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      const response = await fetchService({
        url: 'http://localhost:5000/api/tasks',
        method: 'GET',
        // params: { search: 'example' },
        // token: 'your-token-here',
      });

      if (response.error) {
        setError(response.error);
      } else {
        setData(response.data);
      }
      setLoading(false);
    };

    fetchData();
  }, []); // Solo se ejecuta una vez al montar el componente
  
  console.log("🚀 ~ App ~ data:", data)
  

  return (
    <>
      hola
    </>
  )
}

export default App
