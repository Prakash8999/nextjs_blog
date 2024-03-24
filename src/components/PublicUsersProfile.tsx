'use client'
import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useMemo, useState } from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { GrLocation } from 'react-icons/gr'
import { RiArticleLine, RiUserFollowLine } from 'react-icons/ri'
import { Toaster, toast } from 'sonner'

const PublicUsersProfile = ({ userData, className, session, fetchData, followerCount, postCount }: { userData: any, className: string, session: any, fetchData: any, followerCount: number , postCount:number}) => {
	const [loading, setLoading] = useState(false)
	const isFollowing = useMemo(() => {
		const list = session?.user.followingIds || [];

		return list.includes(userData?.author?.id);
	}, [userData?.author?.id, session?.user.followingIds]);
	//false


	const router = useRouter()
	const handleFollow = () => {
		if (!session) {
			toast.warning("Please Login First")
		}


		if (session?.user.id == userData?.author?.id) {
			router.push('/profile')
		}
		else {
			setLoading(true)
			try {
				const userId = userData?.author?.id
				console.log(userData?.author?.id);

				if (isFollowing) {
					axios(`/api/unfollow?userId=${userId}`, {
						method: "DELETE",

					}).then((res) => {
						console.log(res);
						setLoading(false)
						fetchData
					})
						.catch((err) => {
							console.log(err);
							setLoading(false)

						})
				}
				else {
					axios(`/api/follow`, {
						method: "POST",
						data: {
							userId: userData?.author?.id
						}
					}).then((res) => {
						setLoading(false)
						fetchData()
						console.log(res);
					})

				}

			} catch (error) {
				console.log(error);
				setLoading(false)

			}
		}
	}
	console.log(userData);

	return (
		<>
			<div className={`${className} bg-[#182724] border-2 border-[#03DAB5] text-white min-h-[60vh] h-fit flex flex-col items-center pt-3  rounded-lg shadow-lg`}>

				<Image title={userData?.author?.username} src={userData?.author?.image} alt='User Image' width={100} height={100} className='object-cover rounded-full' referrerPolicy='no-referrer' />
				<p className='text-2xl font-semibold text-center mt-3'>{userData?.author?.name}</p>

				<p className='text-sm mt-3 text-center px-4'>
					`&ldquo;{userData?.author?.bio ? userData?.author?.bio : 'Bio'}&rdquo;`
				</p>

				<div className='mt-3 flex justify-between items-center gap-x-10'>

					<a href={userData?.author?.github} target='_blank' className='flex items-center text-lg gap-x-2'>

						<BsGithub />
						Github</a>
					<a href={userData?.author?.linkedin} target='_blank' className='flex items-center text-lg gap-x-2'>
						<BsLinkedin />
						Linkedin</a>


				</div>


				<div className='mt-3 bg-[#0C1615] w-[80%] h-[25%] rounded-lg shadow-lg py-3 flex flex-col gap-y-3'>
					<div className='flex gap-x-2 text-sm items-center pl-4 '>
						<RiArticleLine />
						<p> Posts Published: {postCount}</p>
					</div>


					

					<div className='flex gap-x-2 text-sm items-center pl-4 '>
						<GrLocation />

						<p>Location: Somewhere on Earth</p>
					</div>
					<div className='flex gap-x-2 text-sm items-center pl-4 '>
						<RiUserFollowLine />

						<p>Followers: {followerCount}</p>
					</div>

				</div>

				<div className='mt-6'>

					<button
						disabled={loading}
						onClick={handleFollow} className={`${isFollowing ? 'bg-gray-400 opacity-50' : 'bg-blue-600 '} px-4 py-2 text-white rounded-md text-xl`}>
						{
							session?.user.id == userData?.author?.id ? 'Edit' : isFollowing ? 'Unfollow' : 'Follow'
						}
					</button>
				</div>

			</div>
			<Toaster />


		</>
	)
}

export default PublicUsersProfile