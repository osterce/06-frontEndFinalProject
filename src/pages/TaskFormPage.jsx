import {useForm} from 'react-hook-form'
import { useTasks } from '../context/TaskContext';

const TaskFormPage = () => {
  const {register, handleSubmit} = useForm();
  const { createTask } = useTasks();

  const onSubmit = handleSubmit((data) => {
      createTask( data )
  });

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={ onSubmit }>
        <input type="text" name="title" placeholder="Title" className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' {...register("title")} autoFocus />
        {/* {errors.title && ( <p className="text-red-500 text-xs italic">Please enter a title.</p> )} */}
        <textarea name="description" id="description" rows="3" placeholder="Description" className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' {...register("description")} ></textarea>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default TaskFormPage