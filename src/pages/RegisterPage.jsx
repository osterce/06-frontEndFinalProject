import { useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom'

const RegisterPage = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticate, errors: registerErrors } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if( isAuthenticate ) navigate('/tasks')
  }, [isAuthenticate] );

  console.log( isAuthenticate );
  const onSubmit = handleSubmit( async(values) => {
    signup( values );
  })

  return (
    <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
      <form onSubmit={ onSubmit }>
        {registerErrors.map( (error, i) => ( <div className='bg-blue-600 p-2 text-white text-center ' key={i}>{ error }</div> ))}
        <input type="text" placeholder='Usuario' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-2 my-2' {...register( 'username', { required: true })} />
        { errors.username && ( <p className='text-red-400'>Nombre de usurio es requerido</p> ) }
        <input type="email" placeholder='Email' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-2 my-2' {...register( 'email', { required:true })} />
        { errors.email && ( <p className='text-red-400'>Email es requerido</p> ) }
        <input type="password" placeholder='Password' className='w-full bg-zinc-700 text-white px-4 py-2 rounded-2 my-2' {...register( 'password', { required:true })} />
        { errors.password && ( <p className='text-red-400'>Password es requerido</p> ) }
        <button type='submit' >Registrar</button>
      </form>
      <p className='flex gap-x-2 justify-between'>Ya tienes una cuenta? <Link to="/login" className='text-sky-500'>Login</Link></p>
    </div>
  )
}

export default RegisterPage