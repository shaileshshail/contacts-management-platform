import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react';
import { useUserAuth } from '../../context/UserAuthContext';
import '../../styles/auth.css'
import { GoogleLogin } from '@react-oauth/google';


export const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(1).max(20).required(),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const { logIn, googleLogin, user } = useUserAuth();
  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const onSubmit = async (data, e) => {
    e.preventDefault();//prevent page refresh on submit
    console.log(data, e);
    try {
      const resMessage = await logIn(data.email, data.password);
      setError(resMessage);
      navigate("/home");
    } catch (err) {
      setError(err.message);
      console.log(err.message);
    }
  }

  const googleOnSuccess = async (credentialResponse) => {
    console.log(credentialResponse);

    const resMessage = await googleLogin(credentialResponse);
    setError(resMessage);

  }


  return (
    <div className='login'>
      {user ? (navigate('/home')) : (
        <div className='container' >
          <div className='org-name'>
            Contacts.com
          </div>
          <p>Log in to your account</p>
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-group">
              <label >Username:</label>
              <input type="text" id="username" name="username" placeholder='example@email.com' {...register("email")} />
            </div>
            <div className="form-group">
              <label >Password:</label>
              <input type="password" id="password" name="password" placeholder='************' {...register("password")} />
            </div>

            <div className="btn">
              <button type="submit">Log In</button>
            </div>
            <div className='google-login'>
            <GoogleLogin
              onSuccess={credentialResponse => {
                googleOnSuccess(credentialResponse);
              }}
              onError={() => {
                setError('Google Login Failed')
                console.log('Login Failed');
              }}
            />
          </div>
          </form>
          {error ?
            <div className='error'>
              <label>{error}</label>
            </div> : <></>}

            <p>
              Don’t have an account?
              <Link to='/signup'>Sign Up</Link>
            </p>
        </div>
      )}
      <div className='display'>
      </div>
    </div>
  )
}

