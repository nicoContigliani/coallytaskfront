import React from 'react';
import { format } from 'date-fns';

const List = ({ task, handleCheck, handleEdit, deleteTaks }) => {
  return (
    <li
      key={task?.id}
      className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 ease-in-out space-y-2 sm:space-y-0 sm:space-x-4"
    >
      <input
        type="checkbox"
        checked={task?.completed}
        onChange={() => handleCheck(task?.id)}
        className="h-4 w-4 sm:h-5 sm:w-5 rounded text-blue-500 focus:ring-blue-400 transition duration-300 ease-in-out"
      />
      <span className="text-gray-800 font-semibold text-sm sm:text-base break-words flex-1 text-center sm:text-left space-y-1">
        <div className="flex items-center justify-start sm:justify-start">
          <h3 className="text-xl font-semibold text-gray-900 truncate">{task?.title}</h3>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span
            className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              task.completed
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <span>{format(new Date(task.createdAt), 'MM/dd/yyyy hh:mm a')}</span>
        </div>
      </span>
      <div className="flex justify-center items-center space-x-2">
        <button
          onClick={() => handleEdit(task?.id)}
          className="bg-blue-500 text-white px-3 py-1 text-xs sm:text-sm rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out"
        >
          Edit
        </button>
        <button
          onClick={() => deleteTaks(task?.id)}
          className="bg-red-500 text-white px-3 py-1 text-xs sm:text-sm rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default List; 