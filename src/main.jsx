import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import store from './components/store/store.js'
import { Provider } from 'react-redux'

import ChangePassword from './components/UserPages/ChangePassword.jsx'
import UpdateAcD from './components/UserPages/UpdateAcD.jsx'
import UpdateAvatar from './components/UserPages/UpdateAvatar.jsx'
import { Home, About, Contact, Signin, Signup, Myrecipe, Addrecipe, RecipePage } from "./components/pages/index.js"
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
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/signin',
        element: <Signin />
      },
      {
        path: '/my-recipe',
        element: <Myrecipe />
      },
      {
        path: '/add-recipe',
        element: <Addrecipe />
      },
      {
        path: '/recipe/:id',
        element: <RecipePage />
      },
      {
        path: '/user/change-password',
        element: <ChangePassword />
      },
      {
        path: '/user/update-account',
        element: <UpdateAcD />
      },
      {
        path: '/user/update-avatar',
        element: <UpdateAvatar />
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
