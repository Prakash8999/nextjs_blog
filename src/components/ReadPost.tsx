'use client'
import { ExtendedPost } from '@/types/db'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { HTMLProps, useMemo } from 'react'
import EditorOutput from './ReadPostContentOutput'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { AiOutlineLike } from "react-icons/ai";
import Spinner from './Loading'
import { FaRegComments } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";

import Link from 'next/link'
import Image from 'next/image'
import * as dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import Like from './Like'
const fetchPost = async () => {
	const { data } = await axios.get('/api/readpost')
	// console.log(post)
	return data

}
interface cn {
	className: string
	session: any
}
const ReadPost = ({ className, session }: cn) => {


	const { isLoading, error, data } = useQuery({ queryKey: ["posdata"], queryFn: fetchPost, staleTime: 10000 })


	const searchParams = useSearchParams()
	const category = searchParams.get('category')


	// const {isLoading,isError,data} = useQuery({queryKey:"postdata", queryFn:fetchPost,  staleTime:10000})
	// 	if (isLoading) {

	// return <Skeleton count={5}  className='w-[70vw] h-full'/>
	// 	}
	const savePost = (id: string) => {

	}

	

	return (
		<>


			<div className={`${className} h-fit `}>

				{
					isLoading ? < Skeleton count={5} baseColor='white' height={100} className='mb-5 rounded-lg' /> :

						// category ? data?.post?.filter((data: any) => data?.category == category && data?.publish).map((post: any, index: number) => {
						// 	return <div key={index} className={` relative bg-white flex  flex-col h-fit overflow-hidden   mb-4 p-4 rounded-xl shadow`}>
						// 		<Link href={`/user/${post?.author?.username}`} className='flex gap-x-3 w-fit'>
						// 			<Image src={post?.author?.image} alt='User Image' width={36} height={36} className='object-cover rounded-full' referrerPolicy='no-referrer' />
						// 			<div className='flex flex-col -space-y-1'>

						// 				<p className='text-sm text-black font-semibold '> {post?.author?.username}

						// 				</p>
						// 				<p className='text-sm'>

						// 					{
						// 						// @ts-ignore
						// 						dayjs(post?.createdAt).format('DD/MM/YY')
						// 					}
						// 				</p>
						// 			</div>

						// 		</Link>

						// 		<div>
						// 			{!post?.coverPhoto ?
						// 				<div className='mt-4'>

						// 					<Link className='' href={`/read/${post?.id}`}>
						// 						<h2 className='font-semibold text-xl '>{post?.title}</h2>

						// 					</Link>

						// 					<div className='py-2'>

						// 						{post?.tags?.split(",").map((val: any) => "#" + val + " , ")}
						// 					</div>
						// 					<div className='flex justify-between pt-2 '>
						// 						<div className='flex   gap-x-10'>

						// 							<button >
						// 								<AiOutlineLike className='text-2xl' />
						// 							</button>


						// 							<button>
						// 								<FaRegComments className='text-2xl' />
						// 							</button>
						// 						</div>


						// 						<button title='save'>
						// 							<IoSaveOutline className='text-2xl' />
						// 						</button>
						// 					</div>
						// 				</div>

						// 				: <div className='mt-4'>

						// 					<Link className='' href={`/read/${post?.id}`}>

						// 						<Image alt='cover photo' src={post?.coverPhoto} width={1000} height={600} className=' h-[50vh] object-cover rounded-lg shadow-lg' priority />
						// 						<h2 className='font-semibold text-xl mt-2'>{post?.title}</h2>
						// 					</Link>

						// 					<div className='flex justify-between pt-2 '>
						// 						<div className='flex   gap-x-10'>

						// 							<button >
						// 								<AiOutlineLike className='text-2xl' />
						// 							</button>


						// 							<button >
						// 								<FaRegComments className='text-2xl' />
						// 							</button>
						// 						</div>


						// 						<button title='save'>
						// 							<IoSaveOutline className='text-2xl' />
						// 						</button>
						// 					</div>
						// 				</div>}


						// 		</div>


						// 		{/* <div className='absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-white to-transparent'></div> */}
						// 	</div>

						// }) :

						data?.post?.filter((data: any) => category != null ? data.category == category : data).map((post: any, index: number) => {
							return <div key={index} className={` relative bg-white flex  flex-col h-fit overflow-hidden   mb-4 p-4 rounded-xl shadow`}>
								<Link href={`/user/${post?.author?.username}`} className='flex gap-x-3 w-fit'>
									<Image src={post?.author?.image} alt='User Image' width={36} height={36} className='object-cover rounded-full' referrerPolicy='no-referrer' />
									<div className='flex flex-col -space-y-1'>

										<p className='text-sm text-black font-semibold '> {post?.author?.username}

										</p>
										<p className='text-sm'>

											{
												// @ts-ignore
												dayjs(post?.createdAt).format('DD/MM/YY')
											}
										</p>
									</div>

								</Link>

								<div>
									{!post?.coverPhoto ?
										<div className='mt-4'>

											<Link className='' href={`/read/${post?.id}`}>
												<h2 className='font-semibold text-xl '>{post?.title}</h2>

											</Link>

											<div className='py-2'>

												{post?.tags?.split(",").map((val: any) => "#" + val + " , ")}
											</div>
											<div className='flex justify-between pt-2 '>
												<div className='flex   gap-x-10'>


													{/* <Like postId={post?.id} currentUserId={session?.user?.id} /> */}


														<AiOutlineLike className='text-2xl' />
													

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

		</>
	)
}

export default ReadPost