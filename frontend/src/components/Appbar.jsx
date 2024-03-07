import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Appbar = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToProfile = () => {
    // You can replace this with the actual route you want to navigate to
    console.log("Navigating to user profile");
    // Example: navigate(`/user/${userDetails.username}`);
  };

  const goToPost = () => {
    navigate("/dashboard/post");
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        
        const token = localStorage.getItem("token");

        const response = await axios.get("http://localhost:3000/api/v1/user/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserDetails(response.data.existingUser);
        setShow(true);
      } catch (error) {
        if (error.response && error.response.status === 401) {
            // Token expired or invalid, remove from local storage
            localStorage.removeItem('token');
            navigate('/');
          } else {
            console.error('Error fetching user details:', error);
            navigate('/');
        }
      }
    };

    fetchUserDetails();
  }, [navigate]);

  return (
    <>
      {show ? (
        <div className="shadow-lg h-16 bg-blue-500">
          <div className="flex items-center justify-between h-full mx-8">
            <div
              className="text-white text-xl font-semibold cursor-pointer"
              onClick={goToProfile}
            >
              {userDetails.username}
            </div>
            <div className="flex items-center space-x-4">
              <button
                className="text-white px-4 py-2 rounded bg-green-500 hover:bg-green-600 focus:outline-none"
                onClick={goToPost}
              >
                Post
              </button>
              <button
                className="text-white px-4 py-2 rounded bg-red-500 hover:bg-red-600 focus:outline-none"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl font-semibold text-gray-800">Loading...</div>
        </div>
      )}
    </>
  );
};
