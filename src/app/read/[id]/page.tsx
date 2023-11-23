'use client'
import EditorOutput from '@/components/ReadPostContentOutput'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React from 'react'




const page = () => {
	const { id } = useParams()
	const fetchData = async () => {
		const { data } = await axios.get(`/api/readpost/${id}`)
		// console.log(post)
		return data
	}
	const { data, isError, isLoading } = useQuery({ queryKey: ['singlepost'], queryFn: fetchData , staleTime:0})
	console.log(data)
	return (
		<>
		<div className='flex justify-center items-center'>

			<div className='w-[70vw] h-full py-10 '>
				<p className='text-center text-4xl font-semibold'>
					{data?.post?.title}
				</p>
				<div className='mt-4'>
					<EditorOutput content={data?.post?.content} />
				</div>
		</div>

			</div>

		</>
	)
}

export default page