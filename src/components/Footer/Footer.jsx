import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import Logo from '../Logo/Logo';
function Footer() {
  return (
    <footer className="bg-white border-y mt-12">
            <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center">
                            <Logo/>
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Resources</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <NavLink to="/" className={({isActive})=>`${isActive?"text-orange-600":"text-gray-600"} hover:underline`}>
                                        Home
                                    </NavLink>
                                </li>
                                <li className="mb-4">
                                    <NavLink to="/about" className={({isActive})=>`${(isActive)?"text-orange-600":"text-gray-600"} hover:underline`}>
                                        About
                                    </NavLink>
                                </li>
                                <li className="mb-4">
                                    <NavLink to="/contact" className={({isActive})=>`${(isActive)?"text-orange-600":"text-gray-600"} hover:underline`}>
                                        Contact-Us
                                    </NavLink>
                                </li> 
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">Follow us</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <a
                                        href="https://github.com/sam33r0"
                                        className="hover:underline"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Github
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">
                        © 2024
                        <a href="https://github.com/sam33r0" className="hover:underline">
                            sameersrivastava
                        </a>
                        . All Rights Reserved.
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer