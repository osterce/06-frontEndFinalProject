import { createContext, useContext, useState } from 'react'
import { createTaskRequest, getTasksRequest } from '../api/tasks'

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error("useTasks must be used within a TaskProvider");
  return context;
};

export function TaskProvider( {children }){

  const [tasks, setTasks] = useState([]);

  const getTask = async() => {
    const res = await getTasksRequest()
    try {
      setTasks(res.data)
    } catch (error) {
      console.log( error );
    }
  }

  const createTask = async( task ) => {
    const res = await createTaskRequest( task );
    console.log( res );
  }

  return(
    <TaskContext.Provider value={{
      tasks,
      createTask,
      getTask,
    }}>
      {children}
    </TaskContext.Provider>
  )
}