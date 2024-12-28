import React from 'react';

const ButtonComponent = ({ type = 'submit', onClick, children, className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
