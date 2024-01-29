
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import React from 'react'
import { useRouter } from 'next/navigation'

interface postType {

	title: string
}

const fetchData = async () => {
	const { data } = await axios.get('/api/user/post')

	return data


}
const UsersPost = () => {
	const { isLoading, isError, data,isSuccess } = useQuery({ queryKey: ['authenticateuserspost'], queryFn: fetchData, staleTime: 10000 })
const router = useRouter()
console.log(data);
	
if(isLoading ) {

	return <h1>
		Loading...
	</h1>
}
 
// let session = await getServerSession(authOptions)


	return (
		<>

{/* {
session ? 
	
} */}


			<div>
			
				{
					data?.userPost?.map((value: any, index: number) => {
						return <div key={index} className='bg-slate-100 rounded-md mb-3 text-xl p-2'>
						<p>	{
								value?.title

							}</p>

						</div>

					})


				}


			</div>

		</>
	)
}

export default UsersPost