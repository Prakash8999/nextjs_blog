'use client'

import React, { useState } from 'react'
import { User } from 'next-auth'
import UserAvatar from './UserAvatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";


import './Styles/Boarder.css'
const UserData = ({ user }: any) => {

	const [show, setShow] = useState(false);
	const showMenu = () => {
		setShow(!show);
	};

	const [darkmode, setDarkmode] = useState(false);
	const handleToggle = () => {
		setDarkmode(!darkmode);
	};

	return (
		<>
			<div className='flex flex-col gap-y-5 relative'>



				<div className=" button flex items-center justify-between cursor-pointer border border-black px-2 py-1.5 rounded-md w-fit  " onClick={showMenu} >


					<div className=' flex items-center gap-x-3'>

						<UserAvatar user={user} />

						<p className="font-semibold text-base">{user?.name}</p>


					</div>

					{
						!show ? <IoIosArrowDown className='ml-2' /> : <IoIosArrowUp className='ml-2' />


					}

					<div className="hoverBtn"></div>
					<div className="hoverBtn-bottom"></div>


				</div>


				<div className={`${show ? 'absolute mt-16 shadow-md bg-[#19192B] text-white   rounded-md p-4 transition-transform' : 'hidden'}`}>
					<div className="flex flex-col gap-y-4 pt-2">
						<div>

							<p className="font-semibold text-base">{user.name}</p>

							<p className="font-light text-sm">{user.email}</p>
						</div>

						<Link href={'/'}>Feed</Link>
						<Link href={'/create'}>Create Post</Link>
						<Link href={'/profile'}>Profile</Link>
						<Link href={`/user/${user.username}`}>Your Post</Link>

						<div className="flex items-center justify-between pr-4">
							<p>Dark Mode</p>
							<div
								className={`w-12 h-6 rounded-full  border transition-color ${darkmode ? 'bg-blue-500' : 'bg-gray-400'}`}
								onClick={handleToggle}
							>
								<div
									className={`w-6 shadow-lg  h-6 rounded-full bg-white border-2 border-gray-300  transform transition-transform ${darkmode ? 'translate-x-full' : 'translate-x-0'
										}`}
								></div>
							</div>
						</div>

						<button className="text-left border-t pt-2" onClick={() => {
							signOut({
								callbackUrl: `${window.location.origin}/`
							});
						}}>Signout</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default UserData