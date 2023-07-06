import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup'
import { useUserAuth } from '../../context/UserAuthContext';
import { useState } from 'react';
import { Landingnav } from '../Landingnav';
import { GoogleLogin } from '@react-oauth/google';

const Signup = () => {

  const schema = yup.object().shape({

    firstname: yup.string(),
    lastname: yup.string(),
    email: yup.string().email(),
    password: yup.string(),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null]),
  });
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  })

  const { signUp, googleRegister, user } = useUserAuth();
  const [message, setMessage] = useState("")
  const navigate = useNavigate();

  const onSubmit = async (data, e) => {
    e.preventDefault();//prevent page refresh on submit
    console.log(data);
    const resMessage = await signUp(data.firstname,
      data.lastname,data.email,data.password);
    setMessage(resMessage);

  }

  const googleOnSuccess=async(credentialResponse)=>{
    console.log(credentialResponse);

    const resMessage=await googleRegister(credentialResponse);
    setMessage(resMessage);

  }


  return (
    <>
    {user?(navigate('/home')):
    (
      <>
      <Landingnav />
      <div className='auth'>
      <div className='container'>
        <div>
          <h1>Sign up for a free account</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label for="firstname">
              First Name
            </label>
            <input type="text" id="firstname" name="firstname" placeholder='example@email.com' {...register("firstname")} />
            {errors.username?.message}
          </div>
          <div className='form-group'>
            <label for="lastname">
              Last Name
            </label>
            <input type="text" id="lastname" name="lastname" placeholder='example@email.com' {...register("lastname")} />
            {errors.username?.message}
          </div>
          <div className='form-group'>
            <label for="email">
              Email
            </label>
            <input type="text" id="email" name="email" placeholder='example@email.com' {...register("email")} />
            {errors.email?.message}
  
          </div>
          <div className='form-group'>
            <label for="pass">
              Password
            </label>
            <input type="text" id="pass" name="pass" placeholder='************' {...register("password")} />
            {errors.password?.message}
          </div>
          <div className='form-group'>
            <label for="confirmpass">
              Confirm Password
            </label>
            <input type="text" id="confirmpass" name="confirmpass" placeholder='************' {...register("confirmPassword")} />
            {errors.confirmPassword?.message}
          </div>
          <div className='form-group'>
          <button  >Sign Up</button>
  
          </div>
        </form>
        <GoogleLogin
                onSuccess={credentialResponse => {
                  googleOnSuccess(credentialResponse);
                }}
                onError={() => {
                  setMessage('Google Login Failed')
                  console.log('Login Failed');
                }}
              />;
        <div>
          {message}
        </div>
  
        <div>
          <p>
            Already have an account
            <Link to='/login'>Log In</Link>
          </p>
        </div>
      </div>
      </div>
      </>
    )
    
    }
    
    </>

  )
}

export default Signup


