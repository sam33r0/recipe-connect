import React, { useEffect, useState } from 'react'
import RecipePage from './RecipePage'
import axios from 'axios'
import { backendUri } from '../../envconfig.js'
import { login } from '../store/authSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardFooter } from "../../@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../@/components/ui/carousel"



function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let authStatus = useSelector((state) => state.auth.status);
  let bppl = true;
  if (!authStatus) {
    // (async()=>{
    //   console.log('checked');
    // await axios.post((backendUri + '/users/refresh-access-token'), {}, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     'Authorization': 'Bearer <token>'
    //   },
    //   withCredentials: true
    // })})();
    axios.post((backendUri + '/users/current-user'), {}, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': 'Bearer <token>'
      },
      withCredentials: true
    }).then((res) => {
      dispatch(login(res.data.data));
    }).catch((error) => {
      console.log('please login!');
    })
  }
  const [recipe, setRecipe] = useState([]);
  useEffect(() => {
    (async () => {
      const reci = await axios.get((backendUri + "/recipe/get-all-recipes"), {})
      setRecipe(reci.data.data.recipes)
      console.log(reci.data.data.recipes);
    })()
  }, [])
  return (
    <>
    <Carousel
      opts={{
        align: "start",
        loop: true
      }}
      className="w-full max-w-xs ml-8"
    >
      <CarouselContent>
        {recipe.map((recip, index) => (
          <Link key={index} to={`/recipe/${recip._id}`}>
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardHeader>{recip.name}</CardHeader>
                  <CardContent className="flex aspect-square w-full items-center justify-center p-6">
                    <img src={recip.image} alt={recip.name} />
                  </CardContent>
                  <CardFooter className="flex justify-between">{recip.category}</CardFooter>
                </Card>
              </div>
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

export default Home