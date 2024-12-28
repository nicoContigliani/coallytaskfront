import React from 'react';
import { useForm } from 'react-hook-form';
import InputsComponent from '../inputs/InputsComponents';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { createTask } from '../../redux/tasksSlice';
import { useDispatch } from 'react-redux';
// Importamos el componente de botón

const Forms = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    console.log(data);

    dispatch(createTask({
      url: 'http://localhost:5000/api/tasks',
      method: 'POST',
      body: {
        title: data.title,
        description: data.description,
        completed: data.completed || false,
      }
    }));
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
            type="title"
            placeholder="Enter your title"
            register={register}
            error={errors.title}
          />
          {errors.email && <span className="text-red-500 text-sm">{errors.title.message}</span>}
        </div>
        <label htmlFor="description" className="block text-gray-600 font-medium text-sm mb-1">description</label>
        <InputsComponent
          id="description"
          name="description"
          type="text"
          placeholder="Enter your description"
          register={register}
          error={errors.description}
        />
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}

        <label htmlFor="completed" className="block text-gray-600 font-medium text-sm mb-1">completed</label>
        <InputsComponent
          id="completed"
          name="completed"
          type="checkbox"
          checked="checked" placeholder="Enter your completed"
          register={register}
          error={errors.completed}
        />
        {errors.completed && <span className="text-red-500 text-sm">{errors.completed.message}</span>}

      </div>


      <div className="text-center">
        <ButtonComponent type="submit">Submit</ButtonComponent>  {/* Usamos el componente de botón */}
      </div>
    </form>
  );
};

export default Forms;

