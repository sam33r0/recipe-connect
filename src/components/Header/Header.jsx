import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '../Logo/Logo'

function Header() {
  return (
    <>
      <header className="shadow sticky z-50 top-0">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <Link to="/" className="flex items-center">
              <Logo />
            </Link>
          </div>
        </nav>
      </header>
    </>
  )
}

export default Header