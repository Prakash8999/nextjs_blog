'use client'
import { ExtendedPost } from '@/types/db'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { HTMLProps, useEffect, useMemo, useState } from 'react'
import EditorOutput from './ReadPostContentOutput'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { AiOutlineLike } from "react-icons/ai";
import Spinner from './Loading'
import { FaChrome, FaRegComments } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";

import Link from 'next/link'
import Image from 'next/image'
import * as dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { RiArticleLine, RiUserFollowLine } from 'react-icons/ri'
import { GrLocation } from 'react-icons/gr'
import SigninModalButton from './SigninModalButton'

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

	console.log(data);

	// const {isLoading,isError,data} = useQuery({queryKey:"postdata", queryFn:fetchPost,  staleTime:10000})
	// 	if (isLoading) {

	// return <Skeleton count={5}  className='w-[70vw] h-full'/>
	// 	}
	const savePost = (id: string) => {

	}


	// console.log(session);
	interface bud {
		followerCount: number,
		postCount: number
	}


	const [basicuserdetail, setBasicuserdetail] = useState<bud | null>(null);

	useEffect(() => {
		if (session) {
			axios('/api/basicuserdetails', {
				method: "GET"
			}).then((res) => {
				console.log(res);
				setBasicuserdetail(res.data)
			}).catch((err) => {

				console.log(err);

			})
		}




	}, [])


	return (
		<>


			<div className='flex  w-[90vw] '>



				<div className='text-white w-[20%] '>
					{
						session ? <div>

							<div className={`${className} bg-[#182724] border-2 border-[#03DAB5] text-white h-fit flex flex-col items-center pt-3  rounded-lg shadow-lg`}>

								<Image title={session?.user.username} src={session?.user?.image} alt='User Image' width={100} height={100} className='object-cover rounded-full' referrerPolicy='no-referrer' />
								<p className='text-2xl font-semibold text-center mt-3'>{session?.user?.name}</p>

								<p className='text-lg text-center px-4'>
									{session?.user?.username}
								</p>

								<div className='mt-3 flex justify-between items-center gap-x-10'>

									<a href={session?.user?.github} target='_blank' className='flex items-center text-lg gap-x-2'>

										<BsGithub />
										Github</a>
									<a href={session?.user?.linkedin} target='_blank' className='flex items-center text-lg gap-x-2'>
										<BsLinkedin />
										Linkedin</a>


								</div>


								<div className='mt-3 bg-[#0C1615] w-[80%] h-fit  rounded-lg shadow-lg py-3 flex flex-col gap-y-2'>
									<div className='flex gap-x-1 text-sm items-center pl-4 '>
										<RiArticleLine />
										<p> Posts Published: {basicuserdetail?.postCount}</p>
									</div>



									<div className='flex gap-x-2 text-sm items-center pl-4 '>
										<GrLocation />

										<p>Location: Somewhere on Earth</p>
									</div>
									<div className='flex gap-x-1 text-sm items-center pl-4 '>
										<RiUserFollowLine />

										<p>Followers: {basicuserdetail?.followerCount}</p>
									</div>

								</div>

								<div className='my-4'>
									<Link href={'/profile'} className='bg-blue-500 rounded-md py-2  text-lg px-4'>

										Edit
									</Link>

								</div>

							</div>

						</div> : <div className={` bg-[#182724] border-2 border-[#03DAB5] text-white min-h-[50vh] flex flex-col  gap-y-4 px-2 pt-3  rounded-lg shadow-lg`}>
							<div className='flex  items-center gap-x-2 justify-center '>

								<FaChrome className='h-5 w-5 md:h-7 md:w-7 text-[#03DAB5] ' />
								<p className='hidden md:block text-white text-lg font-medium '>Redlone </p>
							</div>

							<div className='flex flex-col mt-12 gap-y-3'>


								<p className='text-center text-lg italic px-3'>
									Redlone: Empowering Every Voice, Every Topic. Your Gateway to Diverse Blogging, from Tech Titans to Financial Wizards!
								</p>
								<p className='px-8 text-center'>

									<SigninModalButton />
								</p>
							</div>

						</div>
					}

				</div>


				<div className={` h-fit flex flex-col  items-center w-[65%]`}>

					<SkeletonTheme />

					{
						isLoading ? 
						<div >

						
						<div className={` relative bg-[#182724] text-white border-2 border-[#03DAB5] flex flex-col gap-y-3 w-fit mb-4 p-4 rounded-xl shadow shadow-[#03DAB5]`}>
							
							<div className='flex gap-x-3'>
								< Skeleton baseColor="#0C1615" highlightColor="#182724" style={{ borderRadius: 100 }} height={40} width={40} />
								< Skeleton baseColor="#0C1615" highlightColor="#182724"  height={40} width={100}  style={{ borderRadius: 5 }}/>
								
								</div>

								< Skeleton baseColor="#0C1615" highlightColor="#182724"  style={{ borderRadius: 10 }}  height={350} width={700} />
								< Skeleton baseColor="#0C1615" highlightColor="#182724"  style={{ borderRadius: 5 }} height={40} width={700} />

						</div>

						<div className={` relative bg-[#182724] text-white border-2 border-[#03DAB5] flex flex-col mt-3 gap-y-3 w-fit mb-4 p-4 rounded-xl shadow shadow-[#03DAB5]`}>
							
							<div className='flex gap-x-3'>
								< Skeleton baseColor="#0C1615" highlightColor="#182724" style={{ borderRadius: 100 }} height={40} width={40} />
								< Skeleton baseColor="#0C1615" highlightColor="#182724"  height={40} width={100}  style={{ borderRadius: 5 }}/>
								
								</div>

								< Skeleton baseColor="#0C1615" highlightColor="#182724"  style={{ borderRadius: 10 }}  height={350} width={700} />
								< Skeleton baseColor="#0C1615" highlightColor="#182724"  style={{ borderRadius: 5 }} height={40} width={700} />

						</div>

						</div> :

							// isLoading ? <p className='text-red-50'>
							// 	loading
							// </p> :

							data?.post?.filter((data: any) => category != null ? data.category == category : data).map((post: any, index: number) => {
								return <div key={index} className={` relative bg-[#182724] text-white border-2 border-[#03DAB5]  justify-center  flex  flex-col h-fit overflow-hidden  w-[82%] mb-4 p-4 rounded-xl shadow shadow-[#03DAB5]`}>
									<Link href={`/user/${post?.author?.username}`} className='flex gap-x-3 w-fit text-white'>
										<Image src={post?.author?.image} alt='User Image' width={36} height={36} className='object-cover rounded-full' referrerPolicy='no-referrer' />
										<div className='flex flex-col -space-y-1'>

											<p className='text-sm  font-semibold '> {post?.author?.username}

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
														{post?.likedIds?.length} likes

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

													<Image alt='cover photo' src={post?.coverPhoto} width={800} height={600} className=' h-[50vh] object-cover rounded-lg shadow-lg' priority />
													<h2 className='font-semibold text-xl mt-2'>{post?.title}</h2>

													<div className='flex justify-between pt-2 '>
														<div className='flex   gap-x-10'>

															<button className='flex items-center gap-x-2 justify-center' >
																<AiOutlineLike className='text-2xl' />
																{post?.likedIds?.length} likes
															</button>


															<button className='flex items-center gap-x-2 justify-center'>
																<FaRegComments className='text-2xl' />
																{post?.Comment?.length}
															</button>
														</div>


													</div>
												</Link>
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

export default ReadPost