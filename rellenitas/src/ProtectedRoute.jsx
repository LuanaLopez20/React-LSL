// src/ProtectedRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // Si el usuario no está autenticado o no es admin, redirigirlo al login
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
