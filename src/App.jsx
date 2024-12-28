// src/App.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchTasks, updateTask } from './redux/tasksSlice';
import './App.css';
import Forms from './components/forms/Forms';
import { format } from 'date-fns'; // Importa format de date-fns
import useTaskFilter from './hooks/useTaskFilter';
import ButtonComponent from './components/ButtonComponent/ButtonComponent';



function App() {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [editTaskId, setEditTaskId] = useState(null); // Estado para el id de la tarea a editar


  useEffect(() => {
    // Despacha fetchTasks con parámetros personalizados
    dispatch(fetchTasks({
      url: 'http://localhost:5000/api/tasks',
      method: 'GET',
      params: { search: 'example' },
      token: 'your-token-here',
    }));
  }, [dispatch]);

  const deleteTaks = (id) => {
    console.log("🚀 ~ deleteTaks ~ id:", id); // Check if ID is valid
    dispatch(deleteTask({
      url: `http://localhost:5000/api/tasks`,
      method: 'DELETE',
      id: id,
      params: { search: 'example' },
      token: 'your-token-here',
    }));
  }

  const handleCheck = (id) => {
    console.log("🚀 ~ handleCheck ~ id:", id)
    // Find the task by ID
    let task = tasks.find((task) => task.id === id);
    console.log("🚀 ~ handleCheck ~ task:", task)


    if (task) {
      // Toggle the completed state
      const updatedStatus = !task.completed;

      console.log("🚀 ~ handleCheck ~ updatedStatus:", updatedStatus);

      // Dispatch the updateTask action to update the task status
      dispatch(updateTask({
        url: 'http://localhost:5000/api/tasks', // Your API endpoint for updating tasks
        id: id,
        data: { completed: updatedStatus }, // Update with the new completed status
        token: 'your-token-here', // Token if needed
      }));
    }
  };
  const handleEdit = (id) => {
    setEditTaskId(id); // Establece el id de la tarea seleccionada
  };


  const { filteredTasks, filter, setFilter } = useTaskFilter(tasks);
  console.log("🚀 ~ App ~ filteredTasks:", filteredTasks)



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Coally Tasks App</h1>

      {/* Main Wrapper: Flexbox */}
      <div className="flex flex-col sm:flex-row sm:space-x-6 mb-8">

        {/* Task List */}
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex-1">
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}

          {tasks.length === 0 && !loading && (
            <p className="text-center text-gray-500">No tasks available.</p>
          )}
          <div className="filter-buttons">
              <div className="flex space-x-2">
                <ButtonComponent
                  onClick={() => setFilter('all')}
                  className={`btn ${filter === 'all' ? 'active' : ''}`}
                >
                  All
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => setFilter('completed')}
                  className={`btn ${filter === 'completed' ? 'active' : ''}`}
                >
                  Completed
                </ButtonComponent>
                <ButtonComponent
                  onClick={() => setFilter('pending')}
                  className={`btn ${filter === 'pending' ? 'active' : ''}`}
                >
                  Pending
                </ButtonComponent>
              </div>
            
          </div>

          <ul className="space-y-4">
            {filteredTasks &&
              filteredTasks.map((task) => (
                <li
                  key={task?.id}
                  className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-200 ease-in-out space-y-2 sm:space-y-0 sm:space-x-4"
                >
                  {/* Checkbox for task completion */}
                  <input
                    type="checkbox"
                    checked={task?.completed}
                    onChange={() => handleCheck(task?.id)}
                    className="h-4 w-4 sm:h-5 sm:w-5 rounded text-blue-500 focus:ring-blue-400 transition duration-300 ease-in-out"
                  />

                  {/* Task Title */}
                  <span className="text-gray-800 font-semibold text-sm sm:text-base break-words flex-1 text-center sm:text-left space-y-1">
                    <div className="flex items-center justify-start sm:justify-start">
                      <h3 className="text-xl font-semibold text-gray-900 truncate">{task?.title}</h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${task.completed
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
                  {/* Action Buttons */}
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
              ))}
          </ul>
        </div>
        <div className="flex-1 mb-6 sm:mb-0">
          <Forms taskId={editTaskId} />
        </div>

      </div>
    </div>
  );
}

export default App;
