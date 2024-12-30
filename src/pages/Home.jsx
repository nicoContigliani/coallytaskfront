import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Audio, ThreeDots } from 'react-loader-spinner'
import { deleteTask, fetchTasks, updateTask } from '../redux/tasksSlice';
import Forms from '../components/forms/Forms';
import List from '../components/list/List';
import { ToastContainer } from 'react-toastify';
import useTaskFilter from '../hooks/useTaskFilter';
import { getToken } from '../services/tokenService';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import ButtonFilter from '../components/ButtonFilter/ButtonFilter';

const Home = () => {
  const apiUrl = import.meta.env.VITE_API_URL_LOCAL || import.meta.env.VITE_API_URL;
  const token = getToken();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { tasks, loading } = useSelector((state) => state?.tasks);
  const [editTaskId, setEditTaskId] = useState(null);

  const fetchTasksData = useCallback(() => {
    dispatch(fetchTasks({
      url: `${apiUrl}/api/tasks`,
      method: 'GET',
      token,
    }));
  }, [dispatch, token]);

  useEffect(() => {
    fetchTasksData();
  }, [fetchTasksData]);

  const deleteTaks = useCallback((id) => {
    dispatch(deleteTask({
      url: `${apiUrl}/api/tasks`,
      method: 'DELETE',
      id,
      token,
    }));
  }, [dispatch, token]);

  const { filteredTasks, filter, setFilter } = useTaskFilter(tasks);

  const handleCheck = useCallback((id) => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      const updatedStatus = !task.completed;
      dispatch(updateTask({
        url: `${apiUrl}/api/tasks/${id}`,
        id,
        data: { completed: updatedStatus },
        token,
      }));
    }
  }, [dispatch, tasks, token]);

  const fetchTasksDataTodo = useCallback((data) => {
    const url = typeof data === "boolean"
      ? `${apiUrl}/api/tasks/filter?completed=${data}`
      : `${apiUrl}/api/tasks`;
    dispatch(fetchTasks({
      url,
      method: 'GET',
      token,
    }));
  }, [dispatch, apiUrl, token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="container mx-auto p-4">


      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Coally Tasks App</h1>
      <div className="flex flex-col sm:flex-row sm:space-x-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-md flex-1">
          <ToastContainer />
          <ButtonFilter />
          {loading &&
            <div>
              <p className="text-center">Loading...</p>
            </div>
          }
          <ul className="space-y-4">
            {filteredTasks?.map((task) => (
              <List key={task.id} task={task} handleCheck={handleCheck} handleEdit={setEditTaskId} deleteTaks={deleteTaks} />
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
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
