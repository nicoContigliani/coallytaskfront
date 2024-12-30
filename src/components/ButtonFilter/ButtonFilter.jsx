import React, { useCallback } from 'react'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import { useDispatch } from 'react-redux';
import { fetchTasks } from '../../redux/tasksSlice';
import { getToken } from '../../services/tokenService';

const ButtonFilter = () => {
    const apiUrl = import.meta.env.VITE_API_URL_LOCAL || import.meta.env.VITE_API_URL;
    const token = getToken();

    const dispatch = useDispatch();

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



    return (
        <div className="flex gap-4 justify-center my-4">

            
            <ButtonComponent
                onClick={() => fetchTasksDataTodo('')}
                className="px-4 py-2 rounded bg-blue-500 text-white"
            >
                All
            </ButtonComponent>

            <ButtonComponent
                onClick={() => fetchTasksDataTodo(true)}
                className="px-4 py-2 rounded bg-green-500 text-white"
            >
                Completed
            </ButtonComponent>

            <ButtonComponent
                onClick={() => fetchTasksDataTodo(false)}
                className="px-4 py-2 rounded bg-yellow-500 text-white"
            >
                Pending
            </ButtonComponent>
        </div>
    )
}

export default ButtonFilter