
'use client'
import EditorOutput from '@/components/ReadPostContentOutput'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { notFound, useParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import PublicUsersProfile from '@/components/PublicUsersProfile'
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { BiLike, BiSolidLike } from "react-icons/bi";
dayjs.extend(relativeTime);
const ReadSinglePost = ({ session }: any) => {
	const { id } = useParams()
	const fetchData = async () => {
		const { data } = await axios.get(`/api/readpost/${id}`)

		return data
	}
	const { data, isError, isLoading } = useQuery({ queryKey: ['singlepost'], queryFn: fetchData, staleTime: -4 })
	console.log(data)
	// if (isLoading) {
	// 	return <div className='flex justify-center items-c enter bg-gray-100 h-screen'>

	// 		<Spinner />
	// 	</div>
	// }
	const [isLike, setIsLike] = useState(false)

	const hasLiked = useMemo(() => {
		const list = data?.post?.likedIds || [];
		return list.includes(session?.user?.id);
	}, [fetchData, session?.user?.id]);
	console.log(hasLiked);


	const handleLikes = () => {
		if (!session) {
			return toast.error("Please Login First")
		}

		try {

			const postId = data?.post?.id
			if (hasLiked) {
				axios(`/api/unlike?postId=${postId}`, {
					method: "DELETE",

				}).then((res) => {
					console.log(res);
					setIsLike(false)
				}).catch((err) => {
					console.log(err);

				})
			} else {
				axios('/api/like', {
					method: "POST",
					data: {
						postId: data?.post?.id
					}
				}).then((res) => {
					console.log(res);
					setIsLike(true)
				}).catch((err) => {
					console.log(err);

				})
			}

		} catch (error) {
			console.log(error);

		}
	}

	return (
		<>
			<div className='w-fit '>

				<PublicUsersProfile userData={data?.post} className={"w-[25vw] "} session={session} />
			</div>


			<div className='w-[55vw] min-h-screen h-full shadow-lg   bg-white  rounded-lg '>
				{
					data?.post?.coverPhoto ? <div>

						<Image alt='cover photo' src={data?.post?.coverPhoto} width={1000} height={900} className=' h-[50vh] object-cover rounded-lg shadow-lg' priority />

					</div> : ''
				}

				<div className='px-6'>

					<div className='mt-6    '>
						<div className='flex items-center  gap-x-4 '>
							<Image src={data?.post?.author?.image} alt='User Image' width={32} height={32} className='object-cover rounded-full' referrerPolicy='no-referrer' />
							<div className='flex flex-col'>

								<div className='flex gap-x-3 '>
									{
										data?.post?.author?.name?.toUpperCase()
									}

								</div>

								<div className='flex gap-x-1 items-center'>


									<p className='text-sm '>
										Posted
									</p>
									<p>
										{
											// @ts-ignore

											dayjs(data?.post?.createdAt).toNow()



											// dayjs().to(dayjs(data?.post?.createdAt)) // "31 years ago"
										}
									</p>
								</div>

							</div>
						</div>


					</div>
					<p className='text-left mt-4 text-4xl font-semibold'>

						{
							data?.post?.title?.charAt(0).toUpperCase() + data?.post?.title.slice(1)
						}
					</p>





					<div className='mt-4 pb-8'>
						<EditorOutput content={data?.post?.content} />
					</div>
				</div>


				{/* <PublicUsersProfile data=.post?{data?.post} /> */}




				<div className='fixed right-8 top-24'>
					<button onClick={handleLikes}>
						{
							hasLiked || isLike ? <BiSolidLike className='text-2xl' /> : <BiLike className='text-2xl' />

						}

					</button>
					<p>
						{
							data?.post?.likedIds.length
						}
					</p>
				</div>
			</div>

		</>
	)
}

export default ReadSinglePost