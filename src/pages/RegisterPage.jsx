import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';


const RegisterPage = () => {

  const { register, handleSubmit } = useForm();
  const { signup, user } = useAuth();
  console.log( user );
  const onSubmit = handleSubmit( async(values) => {
    signup( values );
  })

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
      <form onSubmit={ onSubmit }>
        <input type="text" placeholder='Usuario' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-2 my-2' {...register( 'username', { required: true })} />
        <input type="email" placeholder='Email' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-2 my-2' {...register( 'email', { required:true })} />
        <input type="password" placeholder='Password' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-2 my-2' {...register( 'password', { required:true })} />
        <button type='submit' >Registrar</button>
      </form>
    </div>
  )
}

export default RegisterPage