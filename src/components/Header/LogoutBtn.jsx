import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice.js'
import { useNavigate } from 'react-router-dom'
import { backendUri } from './../../envconfig.js'
import { useSelector } from 'react-redux'
import axios from 'axios'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '../../@/components/ui/avatar.jsx'
function LogoutBtn() {
    const user = useSelector((state) => state.auth.userData);
    const accessToken= useSelector((state)=> state.auth.accessToken);
    const avatar = user.avatar;
    const navigate = useNavigate();
    const dispath = useDispatch();
    const logoutHandler = () => {
        axios.post((backendUri + '/users/logout'), {}, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        }).then((res) => {
            //console.log(res);
            dispath(logout());
            navigate('/signin');
        })
    }
    return (
        <>
            <div className='flex'>
                <button className='text-gray-800 hover:bg-gray-50 hover:text-orange-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none' onClick={logoutHandler}>Logout</button>
                <Avatar>
                    <AvatarImage src={avatar} alt="avatar" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
        </>



    )
}

export default LogoutBtn