import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function PrivateRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg font-medium">
        Access denied. You are not authorized to view this page.
      </div>
    );
  }

  return children;
}

export default PrivateRoute;
