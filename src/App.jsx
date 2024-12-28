// src/App.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from './redux/tasksSlice';
import './App.css';
import Forms from './components/forms/Forms';

function App() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    // Despacha fetchTasks con parámetros personalizados
    dispatch(fetchTasks({
      url: 'http://localhost:5000/api/tasks',
      method: 'GET',
      params: { search: 'example' },
      token: 'your-token-here',
    }));
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Coally Tasks App</h1>

      {/* Forms Section */}
      <div className="mb-8">
        <Forms
        />
      </div>

      {/* Task List */}
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        {tasks.length === 0 && !loading && (
          <p className="text-center text-gray-500">No tasks available.</p>
        )}

        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 ease-in-out space-y-2 sm:space-y-0 sm:space-x-4"
            >
              {/* Task Title */}
              <span className="text-gray-800 font-medium text-sm sm:text-base break-words flex-1 text-center sm:text-left">
                {task.title}
              </span>

              {/* Action Buttons */}
              <div className="flex justify-center items-center space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 text-xs sm:text-sm rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300 ease-in-out">
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 text-xs sm:text-sm rounded shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
