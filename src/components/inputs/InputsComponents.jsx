import React from 'react';

const InputsComponent = ({ id, name, type, placeholder, register, error, checked,rules }) => {
  return (
    <div>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={type === 'checkbox' ? undefined : placeholder} // Ocultar placeholder si es checkbox
        className={`mt-2 ${
          type === 'checkbox' ? 'w-5 h-5' : 'p-2 w-full'
        } border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
        {...register(name)} 
        defaultChecked={checked} 
        rules={rules}
      />
      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default InputsComponent;
