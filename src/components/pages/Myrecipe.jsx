import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { backendUri } from '../../envconfig.js'
function Myrecipe() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate();
  if (!authStatus) {
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
      const reci = await axios.get((backendUri + "/recipe/my-recipes"), {})
      setRecipe(reci.data.data.recipes)
      console.log("my recipes: ", reci.data.data.recipes);
    })()
  }, [])
  return (
    <div>Myrecipe</div>
  )
}

export default Myrecipe