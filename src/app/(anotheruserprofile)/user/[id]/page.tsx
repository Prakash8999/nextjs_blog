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
import { FaRegComments } from 'react-icons/fa'
import { IoSaveOutline } from 'react-icons/io5'
import Link from 'next/link'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import * as dayjs from 'dayjs'


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
			<div className='bg-gray-100 w-full min-h-screen h-full flex  justify-start gap-x-10 pt-9 pl-12 '>

				<div className='w-1/4 bg-white h-[80vh] flex flex-col items-center pt-3  rounded-lg shadow-lg'>

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


				<div className='w-2/4 '>

					{
						isLoading ? < Skeleton count={5} baseColor='white' height={100} className='mb-5 rounded-lg' /> :
							userData?.author?.Post?.map((post: any, index: number) => {
								return <div key={index} className={` relative bg-white flex  flex-col h-fit overflow-hidden   mb-4 p-4 rounded-xl shadow`}>
									<div className='flex gap-x-3 w-fit'>
										<Image src={userData?.author?.image} alt='User Image' width={36} height={36} className='object-cover rounded-full' referrerPolicy='no-referrer' />
										<div className='flex flex-col -space-y-1'>

											<p className='text-sm text-black font-semibold '> {userData.author?.username}

											</p>
											<p className='text-sm'>

												{
													// @ts-ignore
													dayjs(post?.createdAt).format('DD/MM/YY')
												}
											</p>
										</div>

									</div>

									<div>
										{!post?.coverPhoto ?
											<div className='mt-4'>

												<Link className='' href={`/read/${post?.id}`}>
													<h2 className='font-semibold text-xl '>{post?.title}</h2>

												</Link>


												<div className='flex justify-between pt-2 '>
													<div className='flex   gap-x-10'>

														<button >
															<AiOutlineLike className='text-2xl' />
														</button>


														<button>
															<FaRegComments className='text-2xl' />
														</button>
													</div>


													<button title='save'>
														<IoSaveOutline className='text-2xl' />
													</button>
												</div>
											</div>

											: <div className='mt-4'>

												<Link className='' href={`/read/${post?.id}`}>

													<Image alt='cover photo' src={post?.coverPhoto} width={1000} height={600} className=' h-[50vh] object-cover rounded-lg shadow-lg' priority />
													<h2 className='font-semibold text-xl mt-2'>{post?.title}</h2>
												</Link>

												<div className='flex justify-between pt-2 '>
													<div className='flex   gap-x-10'>

														<button >
															<AiOutlineLike className='text-2xl' />
														</button>


														<button >
															<FaRegComments className='text-2xl' />
														</button>
													</div>


													<button title='save'>
														<IoSaveOutline className='text-2xl' />
													</button>
												</div>
											</div>}


									</div>


									{/* <div className='absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-white to-transparent'></div> */}
								</div>

							})

					}



				</div>
			</div>
		</>
	)
}

export default page