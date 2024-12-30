'use client'

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import InputsComponent from '../inputs/InputsComponents';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { createTask, fetchTasks, updateTask } from '../../redux/tasksSlice';
import { getToken } from '../../services/tokenService';

const Forms = ({ taskId,setEditTaskId }) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  const { 
    register, 
    handleSubmit, 
    formState: { errors }, 
    setValue, 
    reset,
    watch 
  } = useForm();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);


  const { tasks } = useSelector(state => state.tasks);
  const taskToEdit = tasks.find(task => task.id === taskId);

  useEffect(() => {
    if (taskId) {
      dispatch(fetchTasks({
        url: apiUrl,
        method: 'GET',
        params: { id: taskId },
        token: getToken(),
      }));
    }
  }, [taskId, dispatch]);

  useEffect(() => {
    if (taskToEdit) {
      setValue('title', taskToEdit.title);
      setValue('description', taskToEdit.description);
      setValue('completed', taskToEdit.completed);
    } else {
      reset(); // Clear form when there's no task to edit
    }
  }, [taskToEdit, setValue, reset]);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      if (taskId) {
        await dispatch(updateTask({
          url: `${apiUrl}/api/tasks/${taskId}`,
          id: taskId,
          data: {
            title: data.title,
            description: data.description,
            completed: data.completed || false,
          },
          token: getToken(),
        }));
        setEditTaskId(null);

      } else {
        await dispatch(createTask({
          url: `${apiUrl}/api/tasks`,
          method: 'POST',
          body: {
            title: data.title,
            description: data.description,
            completed: data.completed || false,
          },
          token: getToken(),
        }));
      }
      
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
      setEditTaskId(null);
    }
  };
  
    
  // Check if title and description are filled
  const isFormValid = watch('title') && watch('description');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 bg-gray-50 rounded-lg shadow-md space-y-4 max-w-md mx-auto">
    <h2 className="text-lg font-bold text-gray-800 text-center">
      {taskId ? 'Edit Task' : 'Create Task'}
    </h2>

    <InputsComponent
      id="title"
      name="title"
      type="text"
      placeholder="Enter Title"
      register={register}
      error={errors.title}
      rules={{ required: 'Title is required' }}
    />
    {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}

    <InputsComponent
      id="description"
      name="description"
      type="text"
      placeholder="Enter Description"
      register={register}
      error={errors.description}
      rules={{ required: 'Description is required' }}
    />
    {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}

    <div className="flex items-center gap-2">
      <input
        id="completed"
        type="checkbox"
        {...register('completed')}
        className="h-4 w-4 text-blue-600 focus:ring focus:ring-blue-500 rounded"
      />
      <label htmlFor="completed" className="text-sm text-gray-700">
        Mark as Completed
      </label>
    </div>

    <ButtonComponent
      action={taskId ? 'Update' : 'Create'}
      disabled={isSubmitting || !watch('title') || !watch('description')}
      className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
    >
      {isSubmitting ? 'Submitting...' : taskId ? 'Update Task' : 'Create Task'}
    </ButtonComponent>
  </form>
  );
};

export default Forms;
