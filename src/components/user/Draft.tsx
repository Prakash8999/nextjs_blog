'use client'
import { useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { CiEdit } from 'react-icons/ci'
import { FaRegComments } from 'react-icons/fa'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import * as dayjs from 'dayjs'
interface user {
	userId: string
}

const Draft = ({ userId }: user) => {

	const fetchdata = async () => {
		const { data } = await axios.get(`/api/draft?userId=${userId}`)
		return data
	}

	const { isLoading, data } = useQuery({ queryKey: ["draftpost"], queryFn: fetchdata, staleTime: 1000 })
	
	return (
		<>
			<div className='flex  justify-center  pt-8 '>

				{
					isLoading ? < Skeleton count={5} baseColor='white' height={100} className='mb-5 rounded-lg' /> :
						data?.draftPost?.map((post: any, index: number) => {
							return <div key={index} className={` relative bg-white flex  flex-col h-fit overflow-hidden   mb-4 p-4 rounded-xl shadow`}>
								<div className='flex gap-x-3 w-fit'>
									<Image src={post?.author?.image} alt='User Image' width={36} height={36} className='object-cover rounded-full' referrerPolicy='no-referrer' />
									<div className='flex   -space-y-1 justify-between w-[45vw]'>
										<div>

											<p className='text-sm text-black font-semibold '> {post.author?.username}


											</p>
											<p className='text-sm'>

												{
													// @ts-ignore
													dayjs(post?.createdAt).format('DD/MM/YY')
												}
											</p>
										</div>

										{
											userId == post?.author?.id ? <button className='text-3xl'>
												<Link href={`/edit/${post?.id}`}>
													<CiEdit />
												</Link>

											</button> : null
										}
									</div>

								</div>

								<div>
									{!post?.coverPhoto ?
										<div className='mt-4'>



											{/* <Link className='' href={`/read/${post?.id}`}> */}
												<h2 className='font-semibold text-xl '>{post?.title}</h2>

											{/* </Link> */}



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



											</div>
										</div>}


								</div>


								{/* <div className='absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-white to-transparent'></div> */}
							</div>

						})

				}



			</div>
		</>
	)
}

export default Draft