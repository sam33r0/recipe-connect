import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { backendUri } from '../../envconfig.js'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../@/components/ui/carousel"

function Myrecipe() {
  const authStatus = useSelector((state) => state.auth.status)
  const userdata = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    (async () => {
      const reci = await axios.get((backendUri + "/recipe/my-recipes"), {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${userdata?.refreshToken}`
        },
        withCredentials: true
      })
      setRecipe(reci.data.data)
      console.log(reci);
      console.log(reci.data.data);
      console.log(userdata);
    })()
  }, [])
  return (
    <>
      <Carousel
        opts={{
          align: "start",
          loop: true
        }}
        className="w-5/6 ml-8 mx-auto"
      >
        <CarouselContent className="mx-auto my-5">
          {recipe.map((recip, index) => (
            <Link key={index} to={`/recipe/${recip._id}`}>
              <CarouselItem key={index} className="basis-2/3">
                <div className='flex w-[270px] md:w-[300px] flex-col h-[450px]'>
                  <div className={`${recip.visibility!=true?"bg-gray-200 text-gray-500" : recip.category == "VEG" ? "bg-lime-300 text-red-600" : recip.category == "NONVEG" ? "bg-red-600 text-white" : "bg-yellow-400"} p-2 text-xl font-bold text-center`}>
                    {recip.name}
                  </div>
                  <div className='flex-1 flex justify-center items-center'>
                    <img src={recip.image} className="h-full w-auto" alt={recip.name} />
                  </div>
                  {/* <div className='class="bg-blue-500 p-4 flex justify-center items-center"'>
                {recip.category}
                </div> */}
                </div>
                {/* <div className="">
                <Card>
                  <CardHeader>{recip.name}</CardHeader>
                  <CardContent className="flex  aspect-square w-full items-center justify-center ">
                    <img src={recip.image} alt={recip.name} />
                  </CardContent>
                  <CardFooter className="flex justify-between">{recip.category}</CardFooter>
                </Card>
              </div> */}
              </CarouselItem>
            </Link>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  )
}

export default Myrecipe