import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import store from './components/store/store.js'
import { Provider } from 'react-redux'
import About from './components/pages/About.jsx'
import Contact from './components/pages/Contact.jsx'
import Signup from './components/pages/Signup.jsx'
import Signin from './components/pages/Signin.jsx'
import Myrecipe from './components/pages/Myrecipe.jsx'
import Addrecipe from './components/pages/Addrecipe.jsx'
import RecipePage from './components/pages/RecipePage.jsx'
import ChangePassword from './components/UserPages/ChangePassword.jsx'
import UpdateAcD from './components/UserPages/UpdateAcD.jsx'
import UpdateAvatar from './components/UserPages/UpdateAvatar.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/about',
        element: <About/>
      },
      {
        path: '/contact',
        element: <Contact/>
      },
      {
        path: '/signup',
        element: <Signup/>
      },
      {
        path: '/signin',
        element: <Signin/>
      },
      {
        path: '/my-recipe',
        element: <Myrecipe/>
      },
      {
        path: '/add-recipe',
        element: <Addrecipe/>
      },
      {
        path:'/recipe/:id',
        element: <RecipePage/>
      },
      {
        path: '/user/change-password',
        element: <ChangePassword/>
      },
      {
        path: '/user/update-account',
        element: <UpdateAcD/>
      },
      {
        path: '/user/update-avatar',
        element: <UpdateAvatar/>
      }
    ]
  }]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
