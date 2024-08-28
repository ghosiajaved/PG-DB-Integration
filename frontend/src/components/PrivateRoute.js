import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  // Replace this with your actual authentication logic
  const isAuthenticated = true; // or false for testing

  return isAuthenticated ? (
    <Component {...rest} />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
