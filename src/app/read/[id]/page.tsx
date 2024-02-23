
import ReadSinglePost from '@/components/ReadSinglePost';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import React, { useMemo } from 'react'


const Read =async () => {
	

	const session = await getServerSession(authOptions)
	return (
		<>
			{/* <App/> */}
			<div className='flex justify-center gap-x-20 py-8  bg-gray-100  px-20'>
				<ReadSinglePost session = {session}/>

			</div>

		</>
	)
}

export default Read;