import { createContext, useContext, useEffect, useState } from 'react';
import { loginRequest, registerRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext( AuthContext );
  if( ! context ) throw new Error( 'useAuth must be used within an AuthProvider' );
  return context;
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState( null );
  const [isAuthenticate, setIsAuthenticated] = useState( false );
  const [errors, setErrors] = useState( [] );
  const [loading, setLoading] = useState( true );

  const signup = async( user ) => {
    try {
      const res = await registerRequest( user );
      console.log(res.data);
      setUser( res.data );
      setIsAuthenticated( true );
    } catch (error) {
      setErrors( error.response.data )
    }
  }

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error)
      if( Array.isArray( error.response.data.error )){
        return setErrors( error.response.data.error)
      }
      setErrors(error.response.data.message );
    }
  };

  useEffect( () => {
    if(errors.length > 0 ){
      const timer = setTimeout(() => {
        setErrors([]);
      }, 2000)
      return () => clearTimeout( timer );
    }
  },[ errors ]);

  useEffect(() => {
    const checkLogin = async() => {
      const cookies = Cookies.get();
      if( !cookies.token){
        setIsAuthenticated(false)
        setLoading(false)
        return setUser( null );
      }
      try {
        const res = await verifyTokenRequest(cookies.token);
        //console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setIsAuthenticated(false);
        setLoading(false);
      }
    }
    checkLogin();
  }, []);
  return(
    <AuthContext.Provider value={{
      signup,
      signin,
      user,
      isAuthenticate,
      errors,
      loading
      }}>
      { children }
    </AuthContext.Provider>
  )
}