'use client'
import { ExtendedPost } from '@/types/db'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { HTMLProps } from 'react'
import EditorOutput from './ReadPostContentOutput'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Spinner from './Loading'
import Link from 'next/link'
import Image from 'next/image'

const fetchPost = async () => {
	const { data } = await axios.get('/api/readpost')
	// console.log(post)
	return data

}
interface cn {
	className: string
}
const ReadPost = ({ className }: cn) => {

	const { isLoading, error, data } = useQuery({ queryKey: ["posdata"], queryFn: fetchPost, staleTime: 10000 })

	console.log(data);

	// const {isLoading,isError,data} = useQuery({queryKey:"postdata", queryFn:fetchPost,  staleTime:10000})
	// 	if (isLoading) {

	// return <Skeleton count={5}  className='w-[70vw] h-full'/>
	// 	}
	return (
		<>


			<div className={`${className} h-fit `}>

				{
					isLoading ? < Skeleton count={5} baseColor='white' height={100} className='mb-5 rounded-lg' /> :
						data?.post?.map((post: any, index: number) => {
							return <div key={index} className={` relative bg-white flex  flex-col max-h-[40vh] overflow-hidden   mb-4 p-4 rounded-xl shadow`}>
								<Link href={`/user/${post?.author?.username}`} className='flex gap-x-3'>
									<Image src={post?.author?.image} alt='User Image' width={32} height={32} className='object-cover rounded-full' referrerPolicy='no-referrer' />
									<div>

										<p className='text-sm text-black'> {post?.author?.username}

										</p>

									</div>

								</Link>
								<Link className=' pb-4' href={`/read/${post?.id}`}>
									<h2 className='font-semibold text-xl'>{post?.title}</h2>
									<div className='mt-4'>
										<EditorOutput content={post?.content} />
									</div>
								</Link>

								{/* <div className='absolute bottom-0 left-0 h-16 w-full bg-gradient-to-t from-white to-transparent'></div> */}
							</div>

						})

				}



			</div>

		</>
	)
}

export default ReadPost