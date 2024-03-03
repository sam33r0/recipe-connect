import React, { useState } from 'react'
import { Input } from "./../../@/components/ui/input.jsx"
import { Button } from "./../../@/components/ui/button.jsx"
import { useForm } from "react-hook-form";
import { backendUri } from './../../envconfig.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function ChangePassword() {
  const { register, handleSubmit, reset } = useForm();
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();
  const [succes, setSucces] = useState(false);
  const updatePass = async (data) => {
    try {
      if (data.newPassword === data.password) {
        setErro(false)
        console.log("hehe");
        const res = await axios.post((backendUri + '/users/change-password'),
          {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword
          },
          {
            withCredentials: true
          }
        );
        if (res) {
          setSucces(true);
          setTimeout(()=>navigate('/'),3000);
        }
        reset();
      }
      else {
        setErro(true)
      }
    }
    catch (error) {
      setErro(true);
    }
  }
  return (
    <div className=' mt-3 md:mt-4 md:ml-16 item-center p-4'>
      <div className='shadow rounded bg-gray-200 mx-4 py-4 md:mx-16 px-4 md:px-8 w-5/6 md:w-4/6 h-full justify-center items-center'>
        {succes &&
          <h2 className='text-center text-green-600 text-2xl font-bold leading-tight'>
            Password Updated Successfully
          </h2>}
        <h2 className='text-center text-2xl font-bold leading-tight'>
          Change Your Password
        </h2>
        <form onSubmit={handleSubmit(updatePass)}>
          <div className='my-8 flex flex-col gap-4'>
            <Input type="password" id="email" {...register("oldPassword", { required: true })} placeholder="Old Password"></Input>

            <Input type="password" placeholder="New Password" {...register("newPassword", { required: true })} minLength="8" maxLength="20" autoComplete="on" pattern="^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$"></Input>
            <Input type="password" id="password" {...register("password", { required: true })} placeholder="re-enter new password" autoComplete="on"></Input>

          </div>
          <Button className="" type="submit">Update Password</Button>
        </form>
        {erro && <div className='text-red-500'>Please check the entered Credentials</div>}
      </div>
    </div>
  )
}

export default ChangePassword