import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { useSelector } from 'react-redux';


const App = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
};

export default App;

