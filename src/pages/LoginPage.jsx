import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom';
import { useEffect } from 'react';

const LoginPage = () => {

  const { register, handleSubmit, formState:{ errors } } = useForm();
  const {signin, errors: signinErrors, isAuthenticate } = useAuth();
  const navigate = useNavigate()
  const onSubmit = handleSubmit( data => signin(data) );

  useEffect(()=>{
    console.log(isAuthenticate)
    if(isAuthenticate) navigate('/tasks')
  },[ isAuthenticate ])

  return (

    <div className='flex h-[calc(100vh-100px)] items-center justify-center '>
      <div className=' bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      {signinErrors.map( (error, i) => ( <div className='bg-blue-600 p-2 text-white text-center my-2' key={i}>{ error }</div> ))}
        <h1 className='text-2xl font-bold'>Login</h1>
        <form onSubmit={ onSubmit }>
          <input type="email" placeholder='Email' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-2 my-2' {...register( 'email', { required:true })} />
          { errors.email && ( <p className='text-red-400'>Email es requerido</p> ) }
          <input type="password" placeholder='Password' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-2 my-2' {...register( 'password', { required:true })} />
          { errors.password && ( <p className='text-red-400'>Password es requerido</p> ) }
          <button type='submit' >Iniciar</button>
        </form>
        <p className='flex gap-x-2 justify-between'>No tienes una cuenta aun? <Link to="/register" className='text-sky-500'>Sing up</Link></p>
      </div>
    </div>

  )
}

export default LoginPage