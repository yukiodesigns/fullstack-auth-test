import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const adminLogout = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch('/adminLogout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        auth: token,
      }),
    });

    if (response.status === 201) {
      setShow(true);
      await localStorage.removeItem('token'); 
      window.alert('Logout Successful');
      navigate('/login');
    } else {
      window.alert('Logout Failed');
      navigate('/');
    }
  };

  useEffect(() => {
    adminLogout();
  });

  return (
    <div>
      <h1>{show ? 'Logout Successful' : 'Processing.....'}</h1>
    </div>
  );
};

export default Logout;
