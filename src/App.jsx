import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Recipehelper from './components/RecipeHelper/Recipehelper'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Header />
      <div className='flex flex-wrap'>
        <div className='w-full sm:w-4/6 '>
          <Outlet />
        </div>
        <div className="hidden sm:block bg-lime-200 w-2/6 rounded-md">
          <Recipehelper />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
