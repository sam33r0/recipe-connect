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
      <div className='flex flex-wrap'>
        <div className='w-3/4'>
          <Outlet />
        </div>
        <div className='w-1/4'>
          <Recipehelper />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
