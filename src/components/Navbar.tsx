'use client'


import LoginModal from '@/app/modal/LoginModal';
import Link from 'next/link';
import React from 'react'
import { useState } from 'react'
import { FaChrome } from "react-icons/fa";
import { useSession, signIn, signOut } from 'next-auth/react'
const Navbar = () => {

  const [modal, setModal] = useState({ show: false })
  const user = useSession()
  const handleSignin = () => {
    try {

    } catch (error) {

    }
  }
  console.log(user);

  return (

    <>
      {
        modal.show && <LoginModal data={modal.show} setModal={setModal} />
      }
      <div className='fixed top-0 inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2 '>
        <div className='h-full container max-w-7xl mx-auto flex items-center justify-between gap-2'>
          <Link href={'/'} className='flex gap-x-4 items-center'>


            <FaChrome className='h-5 w-5 md:h-7 md:w-7 text-red-400' />
            <p className='hidden md:block text-zinc-700 text-sm font-medium '>Redlone </p>

          </Link>




          <label htmlFor="default-search" className="mb-2 text-sm  font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative w-[50vw]">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 outline-none" placeholder="Search redlone" required />
            {/* <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 ">Search</button> */}
          </div>
          {
            user.status == 'authenticated' ? <div className='flex flex-col'>{user?.data?.user?.name}

              <button onClick={() => {
                signOut()
              }}>
                Signout
              </button>

            </div> : <button onClick={() => {
              setModal({ show: true })
            }} className='bg-black bg-opacity-90 text-white px-7 py-2 shadow hover:shadow-lg rounded-3xl '>Sign In</button>
          }


        </div>

      </div>


    </>
  )
}

export default Navbar