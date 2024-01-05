'use client'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { RiArticleLine, RiUserFollowLine } from 'react-icons/ri'
import { AiOutlineLike } from 'react-icons/ai'
import { GrLocation } from 'react-icons/gr'
import PublicUsersProfile from '@/components/PublicUsersProfile'



const page = () => {
	const { id } = useParams()
	console.log(id);

	const fetchUserPublicData = async () => {
		const { data } = await axios.get(`/api/publicuserdata/${id}`)
		// console.log(data);

		return data
	}



	const { data: userData, isError, isLoading } = useQuery({ queryKey: ['userpublicdata'], queryFn: fetchUserPublicData, staleTime: 0 })
	console.log(userData);



	const handleFollow = () => {
		console.log(userData?.user?.id);

		try {
			axios('/api/follow', {
				method: "POST",
				data: {
					followerId: String(userData?.user?.id)
				}
			}).then((res) => {
				console.log(res);

			})
		} catch (error) {
			console.log(error);

		}

	}
	if (isLoading) {
		return <h1>
			Loading.......
		</h1>
	}
	return (
		<>
			<div className='bg-gray-100 w-full min-h-screen h-full flex  justify-between pt-9 pl-12 '>

				<div className='w-1/4 bg-white h-[80vh] flex flex-col items-center pt-3 fixed rounded-lg shadow-lg'>

					<Image title={userData?.author?.username} src={userData?.author?.image} alt='User Image' width={100} height={100} className='object-cover rounded-full' referrerPolicy='no-referrer' />
					<p className='text-2xl font-semibold text-center mt-3'>{userData?.author?.name}</p>

					<p className='text-sm mt-3 text-center px-4'>
						"{userData?.author?.bio}"
					</p>

					<div className='mt-3 flex justify-between items-center gap-x-10'>

						<a href={userData?.author?.github} target='_blank' className='flex items-center text-lg gap-x-2'>

							<BsGithub />
							Github</a>
						<a href={userData?.author?.linkedin} target='_blank' className='flex items-center text-lg gap-x-2'>
							<BsLinkedin />
							Linkedin</a>


					</div>


					<div className='mt-3 bg-gray-100 w-[80%] h-[25%] rounded-lg shadow-lg pt-3 flex flex-col gap-y-3'>
						<div className='flex gap-x-2 text-sm items-center pl-4 '>
							<RiArticleLine />
							<p> Posts Published: {userData?.author?.Post?.length}</p>
						</div>


						<div className='flex gap-x-2 text-sm items-center pl-4 '>
							<AiOutlineLike />

							<p>Likes: {userData?.author?.Post?.length}</p>
						</div>

						<div className='flex gap-x-2 text-sm items-center pl-4 '>
							<GrLocation />

							<p>Location: Somewhere on Earth</p>
						</div>
						<div className='flex gap-x-2 text-sm items-center pl-4 '>
							<RiUserFollowLine />

							<p>Followers: {userData?.author?.Post?.length}</p>
						</div>

					</div>

					<div className='mt-6'>


						<button onClick={handleFollow} className='bg-blue-500 px-4 py-2 text-white rounded-md text-xl'>
							Follow
						</button>
					</div>

				</div>


			</div>
		</>
	)
}

export default page