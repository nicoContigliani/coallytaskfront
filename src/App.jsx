import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchTasks, updateTask } from './redux/tasksSlice';
import './App.css';
import Forms from './components/forms/Forms';
import { format } from 'date-fns';
import useTaskFilter from './hooks/useTaskFilter';
import ButtonComponent from './components/ButtonComponent/ButtonComponent';
import { ToastContainer } from 'react-toastify';
import List from './components/list/List';



function App() {

  const apiUrl = import.meta.env.VITE_API_URL;
  console.log("🚀 ~ App ~ apiUrl:", apiUrl)


  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);
  const [snackbarMessage, setSnackbarMessage] = useState(null);
  const [editTaskId, setEditTaskId] = useState(null);


  // Memorizar la tarea de la API y evitar que se recalculen innecesariamente.
  const fetchTasksData = useCallback(() => {
    dispatch(fetchTasks({
      url: apiUrl,
      method: 'GET',
      params: { search: 'example' },
      token: 'your-token-here',
    }));
  }, [dispatch]);

  useEffect(() => {
    fetchTasksData();
  }, [fetchTasksData]);  // Ahora solo se ejecuta cuando fetchTasksData cambia

  // Función de eliminación optimizada con useCallback.
  const deleteTaks = useCallback((id) => {
    console.log("🚀 ~ deleteTaks ~ id:", id);
    dispatch(deleteTask({
      url: apiUrl,
      method: 'DELETE',
      id: id,
      params: { search: 'example' },
      token: 'your-token-here',
    }));
  }, [dispatch]);

  // Manejo de tareas con useMemo para filtrar solo una vez cuando las tareas cambian o el filtro.
  const { filteredTasks, filter, setFilter } = useTaskFilter(tasks);

  const handleCheck = useCallback((id) => {
    let task = tasks.find((task) => task.id === id);

    if (task) {
      const updatedStatus = !task.completed;

      dispatch(updateTask({
        url: `${apiUrl}/${id}`,
        id: id,
        data: { completed: updatedStatus },
        token: 'your-token-here',
      }));
    }
  }, [dispatch, tasks]);  // Dependencias actualizadas para que no se redefina innecesariamente.

  const handleEdit = useCallback((id) => {
    setEditTaskId(id);
  }, []);  // Esta función no depende de ningún estado específico, por lo que no requiere dependencias.

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">Coally Tasks App</h1>

      <div className="flex flex-col sm:flex-row sm:space-x-6 mb-8">
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex-1">
          {loading && <p className="text-center text-gray-500">Loading...</p>}
          {error && <p className="text-center text-red-500">Error: {error}</p>}
          <ToastContainer />
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
                <List
                  task={task}
                  handleCheck={handleCheck}
                  handleEdit={handleEdit}
                  deleteTaks={deleteTaks}
                />
               

              ))}
          </ul>
        </div>
        <div className="flex-1 mb-6 sm:mb-0">
          <Forms
            taskId={editTaskId}
            setEditTaskId={setEditTaskId}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
