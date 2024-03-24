import UserPostDetails from '@/components/user/UsersPost'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React, { useMemo } from 'react'

const page =async () => {
	const session =await getServerSession(authOptions)

	
	
  return (
	<>
	<div className='bg-[#0C1615] w-full min-h-screen h-full text-white'>

	<UserPostDetails session ={session}/>
	</div>
	</>
  )
}

export default page