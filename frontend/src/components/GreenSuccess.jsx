import React from 'react';

const GreenSuccess = ({ message }) => {
  return (
    <div className="success-message absolute top-4 right-4 bg-green-500 text-white p-2 rounded">
      {message}
    </div>
  );
};

export default GreenSuccess;
