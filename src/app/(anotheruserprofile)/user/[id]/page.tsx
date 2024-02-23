import UserPostDetails from '@/components/user/UsersPost'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import React, { useMemo } from 'react'

const page =async () => {
	const session =await getServerSession(authOptions)

	
	
  return (
	<>
	<UserPostDetails session ={session}/>
	</>
  )
}

export default page