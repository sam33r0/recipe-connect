import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice.js'
import { useDispatch } from 'react-redux'
import { Input } from "./../../@/components/ui/input.jsx"
import { Button } from "./../../@/components/ui/button.jsx"
import Logo from './../Logo/Logo.jsx'
import { useForm } from "react-hook-form";
import { backendUri } from './../../envconfig.js'
import axios from 'axios'
function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, reset } = useForm();
    const create = async (data) => {
        const response = await axios.post((backendUri + '/users/register'),
            {
                username: data.username,
                email: data.email,
                fullName: data.fullName,
                dob: data.dob,
                password: data.password,
                avatarLocalPath: data.avatar[0]
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer <token>'
                },
                withCredentials: true
            },
        );
        if (response) {
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
            console.log(res.data.data.user);
            if (res) {
                dispatch(login(res.data.data.user));
                navigate('/');
            }
        }
        reset();
    };

    return (
        <>
            <div className='mt-8 h-full p-4'>
                <div className='shadow rounded bg-gray-200 mx-4 py-4 md:mx-16 px-4 md:px-8 w-5/6 md:size-5/6 justify-center items-center'>
                    <h2 className='text-center text-2xl font-bold leading-tight'>
                        Sign Up to create account
                    </h2>
                    <p className="mt-2 text-center text-base text-black/60">
                        Already have an account?&nbsp;
                        <Link
                            to="/signin"
                            className="font-medium text-primary transition-all duration-200 hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                    <form onSubmit={handleSubmit(create)}>
                        <div className='grid md:grid-cols-2 gap-4 justify-center items-center my-2 py-8'>
                            <div className='flex flex-col gap-4'>
                                <Input type="email" id="email" {...register("email", { required: true })} placeholder="Email"></Input>
                                <Input type="text" {...register("fullName", { required: true })} placeholder="Full Name"></Input>
                                <div>
                                    <label htmlFor="dob">Date of birth</label>
                                    <Input type="date" {...register("dob")} min="1960-01-01" max="2011-12-31" id="dob"></Input>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Input type="text" {...register("username", { required: true })} placeholder="Username"></Input>
                                <div>
                                    <label htmlFor="fileInput">Upload Avatar</label>
                                    <Input type="file" {...register("avatar", { required: true })} id="fileInput"></Input>
                                </div>
                                <Input type="password" {...register("password", { required: true })} placeholder="password" name="password" minLength="8" maxLength="20" autoComplete="on" pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"></Input>
                            </div>
                        </div>
                        <Button type="submit">Create Account</Button>
                    </form>
                    <div className="my-2 flex justify-center">
                        <span className="inline-block w-full max-w-[100px]">
                            <Logo width="100%" />
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup