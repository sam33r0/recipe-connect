import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { Input } from "./../../@/components/ui/input.jsx"
import { Button } from "./../../@/components/ui/button.jsx"
import { Textarea } from "./../../@/components/ui/textarea"
import Logo from './../Logo/Logo.jsx'
import { useForm } from "react-hook-form";
import { ScrollArea } from "./../../@/components/ui/scroll-area"
import Select from './../Select.jsx';
import { backendUri } from './../../envconfig.js'
import axios from 'axios'

function Addrecipe() {
  const authStatus = useSelector((state) => state.auth.status);
  const userdata= useSelector((state)=> state.auth.userData);
  const [cookinTime, setCookinTime] = useState(1);
  const [cookTime, setCookTime] = useState("1 Minute");
  const [ingre, setIngre] = useState('');
  const [ingredient, setIngredient] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  if (!authStatus) {
    navigate('/signin')
  }
  const handleCookTime = (event) => {
    setCookinTime(event.target.value);
    const time = event.target.value * .180;
    const min = Number.parseInt(time % 60);
    const hour = Number.parseInt(time / 60);
    let tex = '';
    if (hour == 1) {
      tex += '1 hour'
    }
    else if (hour > 1) {
      tex += `${hour} hours`
    }
    if (min == 1) {
      tex += ' 1 minute'
    }
    else if (min > 1) {
      tex += ` ${min} minutes`
    }
    if (tex == '')
      tex = "1 minute"
    setCookTime(tex);
  }
  const handleIngre = (event) => {
    setIngre(event.target.value);
  }
  const addIngre = (e) => {
    if(e)
    e.preventDefault();
    if (ingre.length != 0) {
      ingredient.push(ingre);
      setIngredient(ingredient);
      setIngre('');
    }
  }
  const deleteIngredient = (index) => {
    let newArray = [...ingredient.slice(0, index), ...ingredient.slice(index + 1)];
    setIngredient(newArray);
  }
  const recipeSubmit = async (data) => {
    const response = await axios.post((backendUri + '/recipe/upload-recipe'),
      {
        name: data.name,
        ingredient: ingredient,
        content: data.content,
        cookingTime: cookTime,
        visibility: data.vissibility == "Public",
        category: data.category,
        localImagePath: data.localImagePath[0]
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userdata?.refreshToken}`
        },
        withCredentials: true
      },
    );
    reset();
    navigate('/');
  }
  return (
    <>
      <div className='sm:h-[500px]  justify-center items-center'>
        <div className='md:grid w-full sm:mt-8 md:grid-cols-2 gap-4 md:mx-16  py-4 md:p-4 p-2 bg-gray-200 shadow md:w-5/6 w-15/16 h-fit'>
          <form onSubmit={handleSubmit(recipeSubmit)}>
            <div className='flex flex-wrap gap-2'>
              <Input autoComplete="false" id="name" {...register("name", { required: true })} type="text" placeholder="Name of the dish" />
              <Textarea id="content" {...register("content", { required: true })} className="max-h-[230px] min-h-[163px]" placeholder="More about the dish and Instructions for cooking" />
              <div className="w-full">
                <label htmlFor="fileInput">Upload Image</label>
                <Input type="file" {...register("localImagePath", { required: true })} id="fileInput"></Input>
              </div>
              <div className='flex gap-2 w-full'>
                <Select
                  options={["VEG", "NONVEG", "EGG"]}
                  label="Category"
                  {...register("category", { required: true })}
                />
                <Select
                  options={["Public", "Private"]}
                  label="Visibility"
                  {...register("vissibility", { required: true })}
                />

              </div>
            </div>
          </form>
          <div>
            <label htmlFor='cookTime'>
              Cooking Time:
            </label>
            <Input type="range" className={`${cookinTime < 333 ? `bg-green-500` : cookinTime < 666 ? `bg-yellow-500` : `bg-red-500`} appearance-none w-full h-2 my-1 rounded-md outline-none`} id="cookTime" min="1" max="1000" value={cookinTime} onChange={handleCookTime} />
            <div className={`${cookinTime < 333 ? `text-green-500` : cookinTime < 666 ? `text-yellow-500` : `text-red-500`} text-center text-lg font-semibold mb-2`} >
              {cookTime}
            </div>
            <form onSubmit={addIngre}>
              <Input placeholder="Enter Ingredients" value={ingre} onChange={handleIngre} />
              <Button variant="secondary" className="mt-2" onClick={addIngre}>
                Add Ingredient
              </Button><br />
            </form>
            <ScrollArea className="h-[150px] my-2 bg-gray-300 rounded-md">
              {ingredient.map((itm, index) => (
                <li key={index} className='grid grid-cols-3'>
                  <span className='col-span-2'>{itm}</span>
                  <Button variant="destructive" onClick={() => deleteIngredient(index)}>DELETE</Button>
                </li>
              ))}
            </ScrollArea>
          </div>
          <Button className="col-span-2 mx-auto w-[100px]" type="submit" onClick={handleSubmit(recipeSubmit)}>Submit</Button>
        </div>
      </div>
    </>
  )
}

export default Addrecipe