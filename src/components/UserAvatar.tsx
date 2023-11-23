
import { User } from 'next-auth'
import Image from 'next/image'
import React, { FC, use } from 'react'
import { FaRegUserCircle } from "react-icons/fa";
interface userAv {
	user: Pick<User , 'name' | 'image' >
}
const UserAvatar : FC<userAv>= ({user}) => {
  return (
	<>
	{
		user.image ? <div className='relative aspect-square h-8 w-8 rounded-full'>
<Image  src={user.image} alt='User Image' width={32} height={32} className='object-cover rounded-full'  referrerPolicy='no-referrer'/>

		</div> : <FaRegUserCircle /> }
	</>
  )
}

export default UserAvatar