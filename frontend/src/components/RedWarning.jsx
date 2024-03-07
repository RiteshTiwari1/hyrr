import React from 'react';

const RedWarning = ({ message }) => {
  return (
    <div className="warning-message absolute top-4 right-4 bg-red-500 text-white p-2 rounded">
      {message}
    </div>
  );
};

export default RedWarning;
