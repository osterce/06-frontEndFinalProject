import { useEffect } from "react";
import { useTasks } from "../context/TaskContext"

const TaskPage = () => {
  const { getTask, tasks }= useTasks();

  useEffect(()=>{
    getTask();
  },[]);

  if(tasks.length === 0 ) return (<h1>No hay tareas</h1>)

  return (
    <div>
      {
        tasks.map( task => (
          <div key={task.id}>
            <h1>{ task.title}</h1>
            <h1>{ task.description}</h1>
          </div>
        ))
      }
    </div>
  )
}

export default TaskPage