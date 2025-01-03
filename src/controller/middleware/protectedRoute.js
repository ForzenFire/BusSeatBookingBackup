import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token'); // Retrieve token from localStorage
  const role = localStorage.getItem('role');  // Retrieve role from localStorage

  console.log('Token:', token);
  console.log('Role from localStorage:', role);
  console.log('Allowed Roles:', allowedRoles);

  // Case 1: No token
  if (!token) {
    console.log('No token found. Redirecting to login...');
    return <Navigate to="/Login" replace />;
  }

  // Case 2: Token exists, but role is not authorized
  // if (!allowedRoles.includes(role)) {
  //   console.log('Unauthorized role. Redirecting to login...');
  //   return <Navigate to="/Login" replace />;
  // }

  // Case 3: Authorized access
  return children;
};

export default ProtectedRoute;
