import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, saveToken } from '../services/tokenSerice';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
 

 useEffect(() => {
    if (getToken()) {
      navigate('/home');
    }
  }, [])



  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas o error en el servidor');
      }

      const data = await response.json();

      if (data?.token) {
        saveToken(data.token);
        navigate('/home');
      } else {
        alert('No se pudo obtener el token. Verifica el servidor.');
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error.message);
      alert('Error al iniciar sesión: ' + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-white rounded shadow-md"
      >
        <h2 className="mb-4 text-lg font-semibold text-center">Login</h2>
        <input
          type="text"
          placeholder="admin"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="admin"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-500 rounded"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
