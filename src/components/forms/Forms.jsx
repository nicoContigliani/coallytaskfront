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
      reset(); 
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
  
    
  const isFormValid = watch('title') && watch('description');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto p-4 bg-white rounded-lg shadow-md space-y-3"
    >
      <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
        {taskId ? 'Edit Task' : 'Create New Task'}
      </h2>

      <div>
        <label htmlFor="title" className="block text-gray-600 font-medium text-sm mb-1">Title</label>
        <InputsComponent
          id="title"
          name="title"
          type="text"
          placeholder="Enter your title"
          register={register}
          error={errors.title}
          rules={{ required: 'Title is required' }}
        />
        {errors?.title && <span className="text-red-500 text-sm">{errors?.title?.message}</span>}

        <label htmlFor="description" className="block text-gray-600 font-medium text-sm mb-1">Description</label>
        <InputsComponent
          id="description"
          name="description"
          type="text"
          placeholder="Enter your description"
          register={register}
          error={errors.description}
          rules={{ required: 'Description is required' }}
        />
        {errors?.description && <span className="text-red-500 text-sm">{errors?.description.message}</span>}

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
        <ButtonComponent action={taskId ? 'update' : 'create'} disabled={isSubmitting || !isFormValid}>
          {isSubmitting ? 'Submitting...' : (taskId ? 'Update' : 'Submit')}
        </ButtonComponent>
      </div>
    </form>
  );
};

export default Forms;
