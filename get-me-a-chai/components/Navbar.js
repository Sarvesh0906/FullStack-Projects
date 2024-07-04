"use client"
import React, { useState, useEffect, useRef } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import Link from 'next/link';

const Navbar = () => {
    const { data: session } = useSession()
    const [showDropdown, setShowDropdown] = useState(false)
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [dropdownRef])

    return (
        <nav className='bg-blue-950 shadow-white text-white flex justify-between items-center text-lg py-3 px-8 sticky top-0 z-20'>
            <Link href={"/"}>
                <div className="logo font-bold text-2xl flex justify-center items-center gap-4">
                    <img src="/chai.webp" className="rounded-full" width={44} alt="chai" />
                    <span>Get Me A Chai!</span>
                </div>
            </Link>

            <ul className='flex justify-between items-center gap-6 font-semibold'>
                <li className='flex gap-4 relative'>
                    {session &&
                        <>
                            <button 
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                                type="button">
                                Welcome {session.user.name}
                                <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            <div ref={dropdownRef} className={`z-10 ${showDropdown ? "" : "hidden"} absolute top-[52px] right-0 bg-white divide-y divide-gray-300 rounded-lg shadow w-fit dark:bg-gray-700 dark:divide-gray-600`}>
                                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                    <div className="font-bold text-lg">{session.user.name}</div>
                                    <div className="font-medium truncate">{session.user.email}</div>
                                </div>

                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownInformationButton">
                                    <li>
                                        <Link href={"/dashboard"} className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</Link>
                                    </li>
                                    <li>
                                        <Link href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Profile</Link>
                                    </li>
                                    {/* <li>
                                        <Link href={"#"} className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white">Earnings</Link>
                                    </li> */}
                                </ul>

                                <div className="py-2">
                                    <Link href={"#"} onClick={() => signOut()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Sign out</Link>
                                </div>
                            </div>
                        </>}
                    
                    {!session &&
                        <Link href={"/login"}>
                            <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Login
                            </button>
                        </Link>}
                </li>
            </ul>
        </nav>
    )
}

export default Navbar
