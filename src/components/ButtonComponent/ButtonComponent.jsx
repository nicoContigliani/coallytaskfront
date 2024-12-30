import React from 'react';

const ButtonComponent = ({ type = 'submit', onClick, children, action, className = '', disabled }) => {
  const buttonColor = action === 'update' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-green-500 hover:bg-green-600';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full text-white py-2 rounded-lg shadow-md transition duration-200 ${buttonColor} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;