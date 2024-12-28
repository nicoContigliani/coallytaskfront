import React from 'react';

const ButtonComponent = ({ type = 'submit', onClick, children, action, className = '' }) => {
  // Determinamos el color según la acción (update o create)
  const buttonColor = action === 'update'
  ? 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400'
  : 'bg-emerald-500 hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-400';
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full text-white py-2 rounded-lg shadow-md transition duration-200 ${buttonColor} ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
