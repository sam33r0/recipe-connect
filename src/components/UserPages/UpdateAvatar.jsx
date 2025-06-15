import React, { useState } from 'react'
import { Input } from "./../../@/components/ui/input.jsx"
import { Button } from "./../../@/components/ui/button.jsx"
import { useForm } from "react-hook-form";
import { backendUri } from './../../envconfig.js'
import axios from 'axios'
import { login } from '../store/authSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
function UpdateAvatar() {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [erro, setErro] = useState(false);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [succes, setSucces] = useState(false);
  const updateAvat = async (data) => {
    try {
      setErro(false)
      console.log("hehe");
      const fdata = new FormData();
      fdata.append("file", data.avatar[0]);
      fdata.append("upload_preset", "scckzbdr");
      fdata.append('cloud_name', 'de9rb613m')
      const res = await fetch('https://api.cloudinary.com/v1_1/de9rb613m/image/upload', {
        method: 'post',
        body: fdata
      })
      const avatar = await res.json()
      const response = await axios.post((backendUri + '/users/update-avatar'),
        {
          avatar: avatar
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${accessToken}`
          },
          withCredentials: true
        },
      );
      console.log(response.data.data);
      if (response) {
        await dispatch(login({ user: response.data.data }))
        setSucces(true);
        setTimeout(() => navigate('/'), 3000);
      }
      reset();
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
            Avatar Updated Successfully
          </h2>}
        <h2 className='text-center text-2xl font-bold leading-tight'>
          Update Your Password
        </h2>
        <form onSubmit={handleSubmit(updateAvat)}>
          <div className='my-8 flex flex-col gap-4'>
            <div>
              <label htmlFor="fileInput">Upload Avatar</label>
              <Input type="file" {...register("avatar", { required: true })} id="fileInput"></Input>
            </div>
          </div>
          <Button className="" type="submit">Update Avatar</Button>
        </form>
        {erro && <div className='text-red-500'>There was a problem!</div>}
      </div>
    </div>
  )
}

export default UpdateAvatar