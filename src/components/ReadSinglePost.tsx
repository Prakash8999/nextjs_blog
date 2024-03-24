
'use client'
import EditorOutput from '@/components/ReadPostContentOutput'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { notFound, useParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import PublicUsersProfile from '@/components/PublicUsersProfile'
import * as dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useRouter } from 'next/navigation'
import { Toaster, toast } from 'sonner'
import { BiLike, BiSolidLike } from "react-icons/bi";
import { FaRegComments } from "react-icons/fa";
dayjs.extend(relativeTime);

interface PostData {
	followerCount: number,
	postCount: number,
	post: {
		id: string;
		title: string;
		content: string;
		coverPhoto: string;
		Comment: [];
		author: {
			id: string;
			name: string;
			image: string;
		};
		createdAt: string;
		likedIds: string[];
	};
}

const ReadSinglePost = ({ session }: any) => {
	const { id } = useParams()

	const [data, setData] = useState<PostData | null>(null);
	const handleClick = () => {
		window.scrollTo({
			top: 10000,
			behavior: 'smooth'
		});
	};

	const fetchData = async () => {


		await axios(`/api/readpost/${id}`, {
			method: "GET"
		}).then((res) => {
			// console.log(res.data);
			setData(res?.data || {})
		}).catch((err) => {
			console.log(err);

		})
	}

	useEffect(() => {
		fetchData()


	}, [])

	// const { data, isError, isLoading } = useQuery({ queryKey: ['singlepost'], queryFn: fetchData })

	console.log(data)
	// if (isLoading) {
	// 	return <div className='flex justify-center items-c enter bg-gray-100 h-screen'>

	// 		<Spinner />
	// 	</div>
	// }
	const [isLike, setIsLike] = useState(false)
	const [comments, setComments] = useState('')
	const [commentsLoading, setCommentsLoading] = useState(false)

	const hasLiked = useMemo(() => {
		const list = data?.post?.likedIds || [];
		return list.includes(session?.user?.id);
	}, [fetchData, session?.user?.id]);



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
					setIsLike(false)
					console.log(res);
					fetchData()
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
					fetchData()
				}).catch((err) => {
					console.log(err);

				})
			}

		} catch (error) {
			console.log(error);

		}
	}


	const handleComment = async () => {
		if (!session) {
			return toast.error("Please Login First!")
		}

		setCommentsLoading(true)
		try {
			await axios('/api/comments', {
				method: "POST",
				data: {
					body: comments,
					postId: data?.post?.id
				}
			}).then((res) => {
				setCommentsLoading(false)
				console.log(res);
				fetchData()
				setComments('')
			}).catch((err) => {
				console.log(err);

			})


		} catch (error) {
			console.log(error);

		}
	}
	// console.log(data);


	return (
		<>
			<div className='w-fit '>

				<PublicUsersProfile userData={data?.post} fetchData={fetchData} followerCount={data?.followerCount || 0} postCount={data?.postCount || 0} className={"w-[25vw] "} session={session} />
			</div>


			<div className='  h-full'>

				<div className='w-[55vw] bg-[#182724] min-h-screen text-white border-2 border-[#03DAB5] shadow shadow-[#03DAB5]   rounded-lg '>

					{
						data?.post?.coverPhoto ? <div>

							<Image alt='cover photo' src={data?.post?.coverPhoto} width={1000} height={900} className=' h-[50vh] object-cover rounded-t-lg  shadow-lg' priority />

						</div> : ''
					}

					<div className='px-6'>

						<div className='mt-6    '>
							<div className='flex items-center  gap-x-4 '>
								{/* <Image alt='User Image'  src={data?.post?.author?.image}  width={32} height={32} className='object-cover rounded-full' referrerPolicy='no-referrer' /> */}
								{data && (
									<Image
										src={data.post.author.image}
										alt="User Image"
										width={32}
										height={32}
										className="object-cover rounded-full"
										referrerPolicy="no-referrer"
									/>
								)}
								<div className='flex flex-col'>

									<div className='flex gap-x-3 '>
										{
											data?.post?.author?.name?.toUpperCase()
										}

									</div>

									<div className='flex gap-x-1 items-center'>



										<div className='flex items-center gap-x-1'>

											<p>
												{
													// @ts-ignore
													dayjs(data?.post?.createdAt).toNow()

													// dayjs().to(dayjs(data?.post?.createdAt)) // "31 years ago"
												}
											</p>

											<p>
												Ago
											</p>
										</div>
									</div>

								</div>
							</div>


						</div>
						<p className='capitalize text-left mt-4 text-4xl font-semibold'>

							{
								// data?.post?.title?.charAt(0).toUpperCase() + data?.post?.title.slice(1)
								data?.post?.title
							}
						</p>





						<div className='mt-4 pb-8'>
							<EditorOutput content={data?.post?.content} />
						</div>
					</div>


					{/* <PublicUsersProfile data=.post?{data?.post} /> */}




					<div className='fixed right-8 top-24 '>
						<div className='flex flex-col justify-center items-center'>
							<button onClick={handleLikes}>
								{
									hasLiked || isLike ? <BiSolidLike className='text-2xl' /> : <BiLike className='text-2xl' />

								}

							</button>
							<p className=''>
								{
									data?.post?.likedIds.length
								}
							</p>
						</div>


						<div className='mt-3 flex flex-col justify-center items-center'>
							<button onClick={handleClick}>

								<FaRegComments className='text-2xl' />
								{
									data?.post?.Comment?.length
								}
							</button>
						</div>
					</div>


				</div>
				<div className='w-[55vw] min-h-[30vh] bg-[#182724] mt-5 h-fit  text-white border-2 border-[#03DAB5] shadow shadow-[#03DAB5]   rounded-lg  flex flex-col gap-y-4'>
					<div className='pt-3 relative px-6'>
						<input type="text" placeholder='Add a Comment' value={comments} className=' w-full p-2  pl-1 pr-24 text-sm text-white  border-b border-white  bg-transparent focus:ring-blue-500 outline-none' onChange={(e) => {
							setComments(e.target.value)
						}} />

						<button onClick={handleComment} className='absolute right-6 top-2 bg-[#0C1615] py-1 px-2 rounded-md'>Comment</button>
					</div>


					<div className='px-6 flex flex-col gap-y-4 pb-2'>
						{
							data?.post?.Comment.map((value: any, index) => {
								return (
									<div key={index} className='flex gap-x-3 items-center'>
										<Image src={value?.commentUserPhoto || ''} alt='image' width={36} height={30} className='object-cover rounded-full h-10 w-10' referrerPolicy='no-referrer' />
										<div>
											<p className='font-semibold underline underline-offset-4'>
												{value?.commentUsername ? value?.commentUsername : 'no username'}
											</p>

											<p>
												{value?.body}
											</p>
										</div>
									</div>
								)
							})
						}

					</div>
				</div>
			</div>
			<Toaster richColors position='top-center'/>

		</>
	)
}

export default ReadSinglePost