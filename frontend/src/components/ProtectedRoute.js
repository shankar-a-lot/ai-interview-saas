import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import our custom hook

const ProtectedRoute = () => {
  const { user } = useAuth(); // Get the user state from the context

  // If there's no user, redirect to the login page
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If there is a user, show the protected content
  return <Outlet />;
};

export default ProtectedRoute;