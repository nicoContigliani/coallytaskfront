import React from 'react';
import { format } from 'date-fns';

const List = ({ task, handleCheck, handleEdit, deleteTaks }) => {
  return (
    <li className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition">
    <input
      type="checkbox"
      checked={task?.completed}
      onChange={() => handleCheck(task?.id)}
      className="h-4 w-4 text-blue-500"
    />
    <div className="flex-1 mx-4 text-sm">
      <h3 className="font-semibold text-gray-900 truncate">{task?.title}</h3>
      <span className={`inline-block px-2 py-1 text-xs font-medium ${task.completed ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
        {task.completed ? 'Completed' : 'Pending'}
      </span>
      <div className="text-xs text-gray-500">{format(new Date(task.createdAt), 'MM/dd/yyyy hh:mm a')}</div>
    </div>
    <div className="flex space-x-2">
      <button onClick={() => handleEdit(task?.id)} className="bg-blue-500 text-white px-3 py-1 text-xs rounded hover:bg-blue-600">
        Edit
      </button>
      <button onClick={() => deleteTaks(task?.id)} className="bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600">
        Delete
      </button>
    </div>
  </li>
  );
};

export default List; 