'use client'
import EditorOutput from '@/components/ReadPostContentOutput'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React from 'react'
import moment from 'moment'


import App from '@/components/Menu'
import Image from 'next/image'
import Spinner from '@/components/Loading'
import Skeleton from 'react-loading-skeleton'

const page = () => {
	const { id } = useParams()
	const fetchData = async () => {
		const { data } = await axios.get(`/api/readpost/${id}`)
		// console.log(post)
		return data
	}
	const { data, isError, isLoading } = useQuery({ queryKey: ['singlepost'], queryFn: fetchData, staleTime: -4 })
	// console.log(data)
	if (isLoading) {
		return <div className='flex justify-center items-center'>

			<Spinner />
		</div>
	}
	return (
		<>
			{/* <App/> */}
			<div className='flex justify-center items-center'>

				<div className='w-[45vw] h-full py-10 '>
					<p className='text-center text-4xl font-semibold'>
						{/* {

							isLoading ? < Skeleton count={5} baseColor='black'  height={100} width={100} className='mb-5 rounded-lg bg-black h-full w-full' /> : ''
						} */}
						{
							data?.post?.title
						}
					</p>
					<div className='mt-8    '>
						<div className='flex items-center  gap-x-4 '>
							<Image src={data?.post?.author?.image} alt='User Image' width={32} height={32} className='object-cover rounded-full' referrerPolicy='no-referrer' />
							<div className='flex flex-col'>

								<div className='flex gap-x-3 '>
									{
										data?.post?.author?.name?.toUpperCase()
									}
									<p className='text-green-400 cursor-pointer'>. Follow</p>
								</div>
								<p>

									{moment(data?.post?.createdAt).startOf('day').fromNow()}
								</p>

							</div>
						</div>

						<p>
							{/* {format( new Date (data?.post?.createdAt).getTime(), 'dd MMM yyyy')} */}
							{/* {data?.post?.createdAt} */}
							{/* {moment(data?.post?.createdAt).startOf('day').fromNow()} */}
						</p>
					</div>

					<div className='mt-8'>
						<EditorOutput content={data?.post?.content} />
					</div>
				</div>

			</div>

		</>
	)
}

export default page