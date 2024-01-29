import axios from 'axios'
import Image from 'next/image'
import React from 'react'
import { AiOutlineLike } from 'react-icons/ai'
import { BsGithub, BsLinkedin } from 'react-icons/bs'
import { GrLocation } from 'react-icons/gr'
import { RiArticleLine, RiUserFollowLine } from 'react-icons/ri'

const PublicUsersProfile = ({ userData , className}: { userData: any, className:any }) => {

	const handleFollow = () => {
		console.log(userData?.user?.id);

		try {
			axios('/api/follow', {
				method: "POST",
				data: {
					followerId: String(userData?.author?.id)
				}
			}).then((res) => {
				console.log(res);

			})
		} catch (error) {
			console.log(error);

		}

	}

	return (
		<>
			<div className={`${className} bg-white h-[80vh] flex flex-col items-center pt-3  rounded-lg shadow-lg`}>

				<Image title={userData?.author?.username} src={userData?.author?.image} alt='User Image' width={100} height={100} className='object-cover rounded-full' referrerPolicy='no-referrer' />
				<p className='text-2xl font-semibold text-center mt-3'>{userData?.author?.name}</p>

				<p className='text-sm mt-3 text-center px-4'>
					`&ldquo;${userData?.author?.bio}&rdquo;`
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



		</>
	)
}

export default PublicUsersProfile