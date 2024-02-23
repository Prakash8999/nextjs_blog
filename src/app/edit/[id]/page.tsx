import EditPost from '@/components/user/EditPost'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth';
import React from 'react'


const page = async () => {
	const session = await getServerSession(authOptions);


	return (
		<>
			<EditPost session = {session?.user}/>

		</>
	)
}

export default page