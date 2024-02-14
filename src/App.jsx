import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Recipehelper from './components/RecipeHelper/Recipehelper'
import { Outlet } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Outlet/>
      <Recipehelper />
      <Footer />
    </>
  )
}

export default App
