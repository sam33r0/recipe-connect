import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUri } from '../../envconfig.js'
import { useParams } from 'react-router-dom';
import { ScrollArea } from "./../../@/components/ui/scroll-area"
import { useSelector } from 'react-redux'
import { Button } from "../../@/components/ui/button"
import { Link, useNavigate } from 'react-router-dom'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../@/components/ui/avatar.jsx'
import { Switch } from "../../@/components/ui/switch"


function RecipePage() {
  const navigate = useNavigate();
  const deleteRecipe = async () => {
    const delet = await axios.post((backendUri + "/recipe/delete-recipe"), {
      recId: param.id,
    },
      {
        headers: {
          'Authorization': `Bearer ${userdata?.refreshToken}`
        },
        withCredentials: true
      })
    console.log(delet);
    navigate('/')
  }
  const [visibility, setVisibility] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);
  const userdata = useSelector((state) => state.auth.userData);
  const param = useParams();
  const [recipe, setRecipe] = useState({});
  useEffect(() => {
    (async () => {
      const reci = await axios.post((backendUri + "/recipe/get-recipe"), {
        recId: param.id
      },
        {})
      setRecipe(reci.data.data);
      setVisibility(reci.data.data.recipe.visibility);
    })()
  }, [])
  useEffect(() => {
    (async () => {
      await axios.post((backendUri + "/recipe/update-visibility"), {
        id: param.id,
        visibility: visibility
      },
        {
          headers: {
            'Authorization': `Bearer ${userdata?.refreshToken}`
          },
          withCredentials: true
        })
    })()
  }, [visibility])
  return (
    <>
      <div className='flex w-full'>
        <div className='hidden md:flex flex-col w-full'>
          <div className='bg-red-100 h-[270px] overflow-hidden'>
            <img className="w-full h-full object-cover" src={recipe?.recipe?.image} alt={recipe?.recipe?.name} />
          </div>
          <div className=' flex flex-wrap bg-blue-200 h-[270px]'>
            {/* <ScrollArea className={`${recipe?.recipe?.category == "VEG" ? "bg-lime-200 text-red-700" : recipe?.recipe?.category == "NONVEG" ? "bg-red-500 text-white" : "bg-yellow-300"} h-full w-full p-3 rounded-md}`}> */}
            <ScrollArea className={` h-full mx-auto w-5/6 p-3 rounded-md}`}>
              <span className="sticky">Ingredients: </span><br />
              {recipe?.recipe?.ingredient.map((itm, index) => (
                <li key={index} className=''>
                  <span className=''>{itm}</span>
                </li>
              ))}
            </ScrollArea>

          </div>
        </div>
        <div className=' md:h-[540px] w-full'>
          <div className={`${visibility != true ? "bg-gray-200 text-gray-500" : recipe?.recipe?.category == "VEG" ? "bg-lime-300 text-red-600" : recipe?.recipe?.category == "NONVEG" ? "bg-red-600 text-white" : "bg-yellow-400"} p-2 text-xl font-bold text-center`}>
            {recipe?.recipe?.name}
          </div>
          <ScrollArea className={`${recipe?.recipe?.category == "VEG" ? "bg-lime-200 text-red-700" : recipe?.recipe?.category == "NONVEG" ? "bg-orange-200 tight" : "bg-yellow-200"} md:h-[320px] h-[500px] w-full p-3 rounded-md`}>
            <div>
              {recipe?.recipe?.content}
            </div>
          </ScrollArea>
          <div className='bg-brown-500'>
            <div className='flex justify-center mt-2'>
              <span className={`${recipe?.recipe?.cookingTime.includes("1 hour") ? " text-yellow-500" : recipe?.recipe?.cookingTime.includes("2 hour") || recipe?.recipe?.cookingTime.includes("3 hour") ? " text-red-500 " : " text-green-500 "} font-bold`}>Cooking Time: &nbsp; </span>
              <span className={`${recipe?.recipe?.cookingTime.includes("1 hour") ? " text-yellow-500" : recipe?.recipe?.cookingTime.includes("2 hour") || recipe?.recipe?.cookingTime.includes("3 hour") ? " text-red-500 " : " text-green-500 "} font-bold text-lg`}>{recipe?.recipe?.cookingTime}</span>
            </div>
            {!authStatus && (
              <div className='font-bold flex justify-end mt-5 '>
                <div>
                  Author:-
                  <Avatar>
                    <AvatarImage src={recipe?.user?.avatar} alt="avatar" />
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                  <span className='mr-2'>{recipe?.user?.fullName}</span>
                </div>
              </div>
            )}

            {authStatus && (<div className='flex justify-between mx-8 mt-8'>
              <div>
                <Switch
                  checked={visibility}
                  onCheckedChange={() => setVisibility(!visibility)}
                  id="visi"
                />
                <label className="mx-2" htmlFor="visi">Visibility</label>
              </div>
              <div>
                <Button onClick={deleteRecipe}>
                  Delete &nbsp;
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="#E74C3C" d="M19 6h-3V4.5A2.5 2.5 0 0 0 13.5 2h-3A2.5 2.5 0 0 0 8 4.5V6H5a1 1 0 0 0 0 2h1v12a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V8h1a1 1 0 0 0 0-2zm-9-.5A1.5 1.5 0 0 1 10.5 4h3a1.5 1.5 0 0 1 1.5 1.5V6h-6V4.5zM17 20H7a2 2 0 0 1-2-2V8h12v10a2 2 0 0 1-2 2z" />
                  </svg>
                </Button>

              </div>
            </div>
            )}</div>
        </div>
      </div>
      <div className='md:hidden mt-4 flex flex-col w-full'>
        <div className=' flex flex-wrap bg-yellow-100 h-[270px]' style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0)), url(${recipe?.recipe?.image})` }}>
          {/* <ScrollArea className={`${recipe?.recipe?.category == "VEG" ? "bg-lime-200 text-red-700" : recipe?.recipe?.category == "NONVEG" ? "bg-red-500 text-white" : "bg-yellow-300"} h-full w-full p-3 rounded-md}`}> */}
          <ScrollArea className={`mt-4 bg-gray-100 bg-opacity-80 h-5/6 mx-auto w-5/6 p-3 rounded-md}`}>
          <span className="sticky">Ingredients: </span><br />
          {recipe?.recipe?.ingredient.map((itm, index) => (
            <li key={index} className=''>
              <span className=''>{itm}</span>
            </li>
          ))}
          </ScrollArea>
        </div>
      </div>
    </>
  )
}

export default RecipePage