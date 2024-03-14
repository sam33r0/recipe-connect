import React from 'react'
import { useSelector } from 'react-redux'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '../../@/components/ui/avatar.jsx'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../@/components/ui/dropdown-menu"
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { logout } from '../store/authSlice.js'
import { useNavigate } from 'react-router-dom'
import { backendUri } from './../../envconfig.js'

function YourProfile() {
    const user = useSelector((state) => state.auth.userData);
    const avatar = user.avatar;
    const navigate = useNavigate();
    const dispath = useDispatch();
    const accessToken = useSelector((state) => state.auth.accessToken);
    const logoutHandler = () => {
        axios.post((backendUri + '/users/logout'), {}, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${accessToken}`
            },
            withCredentials: true
        }).then((res) => {
            dispath(logout());
            navigate('/about');
        })
    }
    const myRecipe = () => {
        navigate('/my-recipe')
    }
    const changePass = () => {
        navigate('/user/change-password')
    }
    const updateAvata = () => {
        navigate('/user/update-avatar')
    }
    const updateAcco = () => {
        navigate('/user/update-account')
    }
    return (
        <div className='flex'>
            <DropdownMenu className='text-gray-800 hover:bg-gray-50 hover:text-orange-700 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none'>
                <DropdownMenuTrigger>{user.fullName.charAt(0).toUpperCase() + user.fullName.substring(1, user.fullName.indexOf(' '))}&nbsp;&nbsp;</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem><button className="w-full h-full text-left" onClick={logoutHandler}>My Recipes</button></DropdownMenuItem>
                    <DropdownMenuItem><button className="w-full h-full text-left" onClick={changePass}>Change Password </button></DropdownMenuItem>
                    <DropdownMenuItem><button className="w-full h-full text-left" onClick={updateAvata}>Update Profile Photo</button></DropdownMenuItem>
                    <DropdownMenuItem><button className="w-full h-full text-left" onClick={updateAcco}>Update Name or email</button></DropdownMenuItem>
                    <DropdownMenuItem><button className="w-full h-full text-left" onClick={logoutHandler}>Logout</button></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <Avatar>
                <AvatarImage src={avatar} alt="avatar" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}

export default YourProfile