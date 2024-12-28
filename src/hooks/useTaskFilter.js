import { useState, useMemo } from 'react';

const useTaskFilter = (tasks) => {
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'pending'

  const filteredTasks = useMemo(() => {
    if (filter === 'completed') {
      return tasks.filter(task => task.completed);
    } else if (filter === 'pending') {
      return tasks.filter(task => !task.completed);
    }
    return tasks; // Por defecto, muestra todas las tareas
  }, [tasks, filter]);

  return { filteredTasks, filter, setFilter };
};

export default useTaskFilter;
