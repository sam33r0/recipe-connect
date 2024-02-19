import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice.js'
import { useDispatch } from 'react-redux'
import { Input } from "./../../@/components/ui/input.jsx"
import { Button } from "./../../@/components/ui/button.jsx"
import Logo from './../Logo/Logo.jsx'
function Signup() {
    return (
        <>
            <div className='h-full p-4'>
                <div className='shadow rounded bg-gray-200 mx-4 py-4 md:mx-16 px-4 md:px-8 w-5/6 md:size-5/6 justify-center items-center'>
                    <h2 className='text-center text-2xl font-bold leading-tigh'>
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
                    <form >
                        <div className='grid md:grid-cols-2 gap-4 justify-center items-center my-2 py-8'>
                            <div className='flex flex-col gap-4'>
                                <Input type="email" id="email" placeholder="Email"></Input>
                                <Input type="text" placeholder="Full Name"></Input>
                                <div>
                                    <label for="dob">Date of birth</label>
                                    <Input type="date" min="1960-01-01" max="2011-12-31" id="dob"></Input>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <Input type="text" placeholder="Username"></Input>
                                <div>
                                    <label for="fileInput">Upload Avatar</label>
                                    <Input type="file" id="fileInput"></Input>
                                </div>
                                <Input type="password" placeholder="password"></Input>
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