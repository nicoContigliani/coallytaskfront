import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import InputsComponent from '../inputs/InputsComponents';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { createTask, fetchTasks, updateTask } from '../../redux/tasksSlice';
import { useDispatch, useSelector } from 'react-redux';
// Importamos el componente de botón

const Forms = ({ taskId }) => {
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm();
  const dispatch = useDispatch();
  const [getTaskId, SetGetTaskId] = useState(null);

  const { tasks } = useSelector(state => state.tasks);
  const taskToEdit = tasks.find(task => task.id === taskId);  // Encuentra la tarea con el ID

  useEffect(() => {
    // Si hay un taskId, despacha la acción para obtener la tarea
    if (taskId) {
      dispatch(fetchTasks({
        url: 'http://localhost:5000/api/tasks',
        method: 'GET',
        params: { id: taskId },  // Filtra por taskId
        token: 'your-token-here',
      }));
    }
    if (taskId) SetGetTaskId(taskId)
  }, [taskId, dispatch]);

  useEffect(() => {
    // Si tenemos una tarea para editar, configuramos los valores en el formulario
    if (taskToEdit) {
      setValue('title', taskToEdit.title);
      setValue('description', taskToEdit.description);
      setValue('completed', taskToEdit.completed);
    }
  }, [taskToEdit, setValue]);

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data.title:", data.title);
  
    if (taskId) {
      // Si existe un taskId, actualizamos la tarea existente
      dispatch(updateTask({
        url: `http://localhost:5000/api/tasks/${getTaskId}`,
        id: getTaskId,
        data: {
          title: data.title,
          description: data.description,
          completed: data.completed || false,
        },
        token: 'your-token-here',
      }));
    } else {
      // Si no existe taskId, creamos una nueva tarea
      dispatch(createTask({
        url: 'http://localhost:5000/api/tasks',
        method: 'POST',
        body: {
          title: data.title,
          description: data.description,
          completed: data.completed || false,
        },
        token: 'your-token-here',
      }));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md space-y-3"
    >
      <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Formulario Compacto</h2>

      <div>
        <div>
          <label htmlFor="title" className="block text-gray-600 font-medium text-sm mb-1">Title</label>
          <InputsComponent
            id="title"
            name="title"
            type="text"
            placeholder="Enter your title"
            register={register}
            error={errors.title}
          />
          {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>

        <label htmlFor="description" className="block text-gray-600 font-medium text-sm mb-1">Description</label>
        <InputsComponent
          id="description"
          name="description"
          type="text"
          placeholder="Enter your description"
          register={register}
          error={errors.description}
        />
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}

        <label htmlFor="completed" className="block text-gray-600 font-medium text-sm mb-1">Completed</label>
        <InputsComponent
          id="completed"
          name="completed"
          type="checkbox"
          register={register}
          error={errors.completed}
        />
        {errors.completed && <span className="text-red-500 text-sm">{errors.completed.message}</span>}
      </div>

      <div className="text-center">
        <ButtonComponent action={taskId ? 'update' : 'create'}>
          {taskId ? 'Update' : 'Submit'}
        </ButtonComponent>
      </div>
    </form>
  );
};

export default Forms;
