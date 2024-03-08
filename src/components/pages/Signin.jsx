import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from "./../../@/components/ui/input.jsx"
import { Button } from "./../../@/components/ui/button.jsx"
import Logo from './../Logo/Logo.jsx'
import { useDispatch } from 'react-redux'
import { login } from '../store/authSlice.js'
import { useForm } from "react-hook-form";
import { backendUri } from './../../envconfig.js'
import axios from 'axios'
function Signin() {
  const [erro,setErro]=useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const signing = async (data) => {
    try {
      const res = await axios.post((backendUri + '/users/login'),
        {
          username: data.username,
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true
        }
      );
      if (res) {
        dispatch(login(res.data.data.user));
        navigate('/');
      }
      reset();
    }
    catch (error) {
      console.log(error);
      setErro(true);
    }
  }
  return (
    <div className='h-full mt-3 md:ml-16 item-center pb-4 px-4'>
      <div className='shadow rounded bg-gray-200 mx-4 py-4 md:mx-16 px-4 md:px-8 w-5/6 md:w-4/6 h-full justify-center items-center'>
        <h2 className='text-center text-2xl font-bold leading-tight'>
          Sign In to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don't have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        <form onSubmit={handleSubmit(signing)}>
          <div className='my-8 flex flex-col gap-4'>
            <Input type="email" id="email" {...register("email")} placeholder="Email"></Input>
            <p className="text-center text-base text-black/60">OR</p>
            <Input type="text" placeholder="username" {...register("username")}></Input>
            <label htmlFor="password">Password</label>
            <Input type="password" id="password" {...register("password", { required: true })} placeholder="password" autoComplete="on"></Input>

          </div>
          <Button className="w-2/6 md:w-1/6" type="submit">Sign In</Button>
        </form>
        {erro && <div className='text-red-500'>Please check the entered Credentials</div>}
        <div className="my-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
      </div>
    </div>
  )
}

export default Signin