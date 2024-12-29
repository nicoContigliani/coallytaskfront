import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchTasks, updateTask } from '../redux/tasksSlice';
import Forms from '../components/forms/Forms';
import ButtonComponent from '../components/ButtonComponent/ButtonComponent';
import List from '../components/list/List';
import { ToastContainer } from 'react-toastify';
import useTaskFilter from '../hooks/useTaskFilter';
import { getToken, removeToken } from '../services/tokenService';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const token = getToken();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [editTaskId, setEditTaskId] = useState(null);

  const fetchTasksData = useCallback(() => {
    dispatch(fetchTasks({
      url: `${apiUrl}/api/tasks`,
      method: 'GET',
      token: getToken(),
    }));
  }, [dispatch]);

  useEffect(() => {
    fetchTasksData();
  }, [fetchTasksData]);

  const deleteTaks = useCallback((id) => {
    dispatch(deleteTask({
      url: `${apiUrl}/api/tasks`,
      method: 'DELETE',
      id: id,
      token: getToken(),
    }));
  }, [dispatch]);

  const { filteredTasks, filter, setFilter } = useTaskFilter(tasks);

  const handleCheck = useCallback((id) => {
    const task = tasks.find((task) => task.id === id);

    if (task) {
      const updatedStatus = !task.completed;
      dispatch(updateTask({
        url: `${apiUrl}/api/tasks/${id}`,
        id: id,
        data: { completed: updatedStatus },
        token: getToken(),
      }));
    }
  }, [dispatch, tasks]);

  const handleEdit = useCallback((id) => {
    setEditTaskId(id);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Coally Tasks App</h1>
      <div className="flex flex-col sm:flex-row sm:space-x-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          {loading && <p className="text-center">Loading...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          <ToastContainer />
          <div className="filter-buttons flex gap-4 justify-center my-4">
            <ButtonComponent
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 shadow-sm ${filter === 'all'
                ? 'bg-blue-500 text-white shadow-md hover:bg-blue-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              All
            </ButtonComponent>
            <ButtonComponent
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 shadow-sm ${filter === 'completed'
                ? 'bg-green-500 text-white shadow-md hover:bg-green-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              Completed
            </ButtonComponent>
            <ButtonComponent
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg transition-all duration-300 shadow-sm ${filter === 'pending'
                ? 'bg-yellow-500 text-white shadow-md hover:bg-yellow-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
            >
              Pending
            </ButtonComponent>
          </div>
          <ul className="space-y-4">
            {filteredTasks && filteredTasks.map((task) => (
              task && <List key={task.id} task={task} handleCheck={handleCheck} handleEdit={handleEdit} deleteTaks={deleteTaks} />
            ))}
          </ul>
        </div>
        <div className="flex-1">
          <Forms taskId={editTaskId} setEditTaskId={setEditTaskId} />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-all duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
