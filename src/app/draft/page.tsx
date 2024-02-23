import Draft from '@/components/user/Draft'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { notFound } from 'next/navigation'
import React from 'react'

const page = async() => {
	const session = await getServerSession(authOptions)
if (!session) {
	return notFound
}


	const userId  = session?.user?.id 

	
  return (
	<>
	<div className='bg-gray-100 min-h-screen h-full'>

	<Draft userId = {userId}/>
	</div>
	{/* <div>{typeof userId}</div> */}
	</>
  )
}

export default page