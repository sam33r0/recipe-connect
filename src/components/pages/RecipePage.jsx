import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUri } from '../../envconfig.js'
import { useParams } from 'react-router-dom';
import { ScrollArea } from "./../../@/components/ui/scroll-area"
import { useSelector } from 'react-redux'
import { Button } from "../../@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../@/components/ui/avatar.jsx'
function RecipePage() {
  const authStatus = useSelector((state) => state.auth.status);
  const param = useParams();
  const [recipe, setRecipe] = useState({});
  console.log(param.id);
  useEffect(() => {
    (async () => {
      const reci = await axios.post((backendUri + "/recipe/get-recipe"), {
        recId: param.id
      },
        {})
      setRecipe(reci.data.data);
      console.log(reci.data.data);
    })()
  }, [])
  return (
    <>
      <div className='flex w-full'>
        <div className='flex flex-col w-full'>
          <div className='bg-red-100 h-[270px] overflow-hidden'>
            <img className="w-full h-full object-cover" src={recipe?.recipe?.image} alt={recipe?.recipe?.name} />
          </div>
          <div className=' flex flex-wrap bg-yellow-100 h-[270px]'>
            <ScrollArea className={`${recipe?.recipe?.category == "VEG" ? "bg-lime-200 text-red-700" : recipe?.recipe?.category == "NONVEG" ? "bg-red-500 text-white" : "bg-yellow-300"} h-full w-full p-3 rounded-md}`}>
              <span className="sticky">Ingredients: </span><br />
              {recipe?.recipe?.ingredient.map((itm, index) => (
                <li key={index} className=''>
                  <span className=''>{itm}</span>
                </li>
              ))}
            </ScrollArea>

          </div>
        </div>
        <div className='bg-green-100 h-[540px] w-full'>
          <div className={`${recipe?.recipe?.visibility != true ? "bg-gray-200 text-gray-500" : recipe?.recipe?.category == "VEG" ? "bg-lime-300 text-red-600" : recipe?.recipe?.category == "NONVEG" ? "bg-red-600 text-white" : "bg-yellow-400"} p-2 text-xl font-bold text-center`}>
            {recipe?.recipe?.name}
          </div>
          <ScrollArea className="h-[320px] w-full p-3 bg-gray-300 rounded-md">
            <div>
              {recipe?.recipe?.content}
            </div>
          </ScrollArea>
          <div className='flex justify-center mt-2'>
            <span>Cooking Time: &nbsp; </span>
            <span className={`${recipe?.recipe?.cookingTime.includes("1 hour") ? " text-yellow-500" : recipe?.recipe?.cookingTime.includes("2 hour") || recipe?.recipe?.cookingTime.includes("3 hour") ? " text-red-500 " : " text-green-500 "}`}>{recipe?.recipe?.cookingTime}</span>
          </div>
          <div>
            <div className='flex flex-col justify-end px-4 '>
              <div>Author:-</div>
              
              <Avatar>
                <AvatarImage src={recipe?.user?.avatar} alt="avatar" />
                <AvatarFallback>NA</AvatarFallback>
              </Avatar>

              {recipe?.user?.fullName}
            </div>
          </div>
          <div className='flex justify-center'>
            {authStatus && (
              <Button className="mt-2" onClick={console.log("hello")}>
                Edit Recipe
              </Button>)}
          </div>
        </div>

      </div>
    </>
  )
}

export default RecipePage