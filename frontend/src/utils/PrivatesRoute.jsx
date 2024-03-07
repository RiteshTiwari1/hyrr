import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';

const PrivatesRoute = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
        const token = localStorage.getItem("token");
      
        if (!token) {
          return navigate("/");
        }
      
        try {
          const response = await axios.get("http://localhost:3000/api/v1/auth/", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
          if (response.status === 200) {
            setLoggedIn(true);
          } else {
            // Handle unexpected status codes
            console.error("Unexpected status code:", response.status);
            return navigate("/");
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            // Token expired or invalid, remove from local storage
            localStorage.removeItem("token");
            return navigate("/");
          }
      
          console.error("Error checking authentication:", error);
          return navigate("/");
        }
      };
      

    checkAuthentication();
  }, [navigate]);

  return (
    <>
      {loggedIn ? (
        <Outlet />
      ) : null}
    </>
  );
};

export default PrivatesRoute;
