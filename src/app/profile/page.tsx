import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '@/lib/auth'
import Profile from '@/components/user/Profile'

const page =async () => {
	const session = await getServerSession(authOptions)
  return (
	<>
	<div className='bg-gray-100 w-full min-h-screen h-full'>

		
	<Profile session={ session}/>
	</div>
	
	</>
  )
}

export default page