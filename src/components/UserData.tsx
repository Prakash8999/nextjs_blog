'use client'

import React, { useState } from 'react'
import { User } from 'next-auth'
import UserAvatar from './UserAvatar'
import Link from 'next/link'
import { signOut } from 'next-auth/react';
import { IoIosArrowDown ,IoIosArrowUp } from "react-icons/io";

interface userData {
	user: Pick<User, 'name' | 'image' | 'email'>
}


const UserData = ({ user }: userData) => {

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

			<div className="flex items-center justify-between cursor-pointer border px-4 py-1.5 rounded-md w-[20vw] " onClick={showMenu} >
<div className='flex items-center gap-x-3'>

				<UserAvatar user={user} />
				<p className="font-semibold text-base">{user.name}</p>
</div>
{
!show ? <IoIosArrowDown /> : <IoIosArrowUp />


}

			</div>


			<div className={`${show ? 'block absolute right-10 translate-y-4 top-16 shadow-md bg-[#19192B] text-white   rounded-md p-3 transition-transform' : 'hidden'}`}>
				<div className="flex flex-col gap-y-4 pt-2">
					<div>

						<p className="font-semibold text-base">{user.name}</p>

						<p className="font-light text-sm">{user.email}</p>
					</div>

					<Link href={''}>Feed</Link>
					<Link href={''}>Create Community</Link>
					<Link href={''}>Setting</Link>

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
		</>
	)
}

export default UserData