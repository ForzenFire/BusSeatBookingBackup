import React from 'react';
import { useNavigate } from 'react-router-dom'; 

const Unauthorized = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); 
  };

  return (
    <div>
      <h1>403 - Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <button onClick={handleLoginClick}>Login Page</button> 
    </div>
  );
};

export default Unauthorized;