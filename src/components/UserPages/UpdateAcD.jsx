import React, { useState } from 'react'
import { Input } from "./../../@/components/ui/input.jsx"
import { Button } from "./../../@/components/ui/button.jsx"
import { useForm } from "react-hook-form";
import { backendUri } from './../../envconfig.js'
import axios from 'axios'
import { login } from '../store/authSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function UpdateAcD() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [succes, setSucces] = useState(false);
  const updatePass = async (data) => {
    try {
      setErro(false)
      console.log("hehe");
      const res = await axios.post((backendUri + '/users/update-account-detail'),
        {
          email: data.email,
          fullName: data.fullName
        },
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          },
          withCredentials: true
        }
      );
      if (res) {
        dispatch(login(res.data.data))
        setSucces(true);
        setTimeout(() => navigate('/'), 3000);
      }
      reset();
    }

    catch (error) {
      console.error(error)
      setErro(true);
    }
  }
  return (
    <div className=' mt-3 md:mt-4 md:ml-16 item-center p-4'>
      <div className='shadow rounded bg-gray-200 mx-4 py-4 md:mx-16 px-4 md:px-8 w-5/6 md:w-4/6 h-full justify-center items-center'>
        {succes &&
          <h2 className='text-center text-green-600 text-2xl font-bold leading-tight'>
            Details Updated Successfully
          </h2>}
        <h2 className='text-center text-2xl font-bold leading-tight'>
          Change Your Email and Name
        </h2>
        <form onSubmit={handleSubmit(updatePass)}>
          <div className='my-8 flex flex-col gap-4'>
            <Input type="email" id="email" {...register("email", { required: true })} placeholder="new email"></Input>

            <Input type="text" placeholder="Name" {...register("fullName", { required: true })}></Input>

          </div>
          <Button className="" type="submit">Update Details</Button>
        </form>
        {erro && <div className='text-red-500'>Email already exists</div>}
      </div>
    </div>
  )
}

export default UpdateAcD