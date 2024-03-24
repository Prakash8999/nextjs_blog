'use client'

import React, { useState } from 'react'

import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { z } from 'zod'
import { Toaster, toast } from 'sonner'
interface user {
	// user: Pick<User, 'email' | 'image' | 'name' >

	session: any
}


const Profile = ({ session }: user) => {
	// console.log(session);


	const [username, setUserName] = useState<string>(session?.user?.username)
	const [bio, setBio] = useState<string>(session?.user?.bio)
	const [linkedin, setLinkedin] = useState<string>(session?.user?.linkedin)
	const [website, setWebsite] = useState<string>(session?.user?.website)
	const [github, setGitHub] = useState<string>(session?.user?.github)
	const [skills, setSkills] = useState<string>(session?.user?.coding_skills)

	const [isEditable, setIsEditable] = useState<boolean>(false)
	const [isPending, setIsPending] = useState<boolean>(false)

	const setEditable = () => {
		setIsEditable(!isEditable)
	}


	// 	const { mutate: updateProfile, isPending } = useMutation({
	// 		mutationFn: async () => {
	// 			return await axios.patch('/api/profile', {

	// 				data: {
	// 					uname: username,
	// 					bio: bio,
	// 					github: github,
	// 					linkedin: linkedin,
	// 					skills: skills,
	// 					website: website
	// 				}
	// 			})
	// 		}
	// 	})

	// const handleComplete = ( ) =>{
	// 	updateProfile
	// }

	const updateProfile = async () => {

		setIsPending(true)
		try {
			await axios('/api/profile', {
				method: "PATCH",

				data: {
					uname: username,
					bio: bio,
					github: github,
					linkedin: linkedin,
					coding_skills: skills,
					website: website
				}
			}).then((res) => {

				console.log(res);
				setIsEditable(!isEditable)
				setIsPending(false)
				toast.success(res?.data?.message)
			}).catch((err) => {
				console.log(err);
				setIsPending(false)
				toast.error(err?.response?.data?.message)
			})
		} catch (error) {
			console.log(error);

			setIsEditable(!isEditable)
			setIsPending(false)
		}
	}
	return (
		<>
			<div className='flex pb-5 flex-col items-center  gap-y-6 '>
				<div className='mt-4 bg-[#182724] p-4  rounded-md w-[55vw] h-full px-8 '>
					<p className='font-semibold text-xl'>
						User Detail
					</p>

					<div className='mt-6 flex flex-col gap-y-6'>
						<div className='flex flex-col gap-y-2 items-center'>

							<label htmlFor="user">Profile </label>
							{/* <UserAvatar user={session?.user} />
 */}

							<Image src={session?.user?.image} width={80} height={80} className='rounded-full' alt='profilepic' />

							{/* <input type="text" value={session?.user?.name} disabled={true} className='h-11 outline-none border pl-2 rounded-lg' placeholder='Bruce Wayne' /> */}
						</div>


						<div className='flex flex-col gap-y-2'>

							<label htmlFor="user">Name</label>
							<input type="text" value={session?.user?.name} disabled={true} className='h-11 outline-none border pl-2 rounded-lg placeholder:opacity-60  placeholder:text-white bg-[#0C1615] ' placeholder='Bruce Wayne' />
						</div>


						<div className='flex flex-col gap-y-2'>

							<label htmlFor="user">UserName</label>
							<input type="text" value={username} disabled={!isEditable} onChange={(e) => {
								setUserName(e.target.value)
							}} className='h-11 outline-none border pl-2 rounded-lg bg-[#0C1615] placeholder:text-white ' placeholder='thebruce' />
						</div>

						<div className='flex flex-col gap-y-2'>

							<label htmlFor="user">Email</label>
							<input type="text" value={session?.user?.email} disabled={true} className='h-11 outline-none border pl-2 rounded-lg bg-[#0C1615] placeholder:text-white' placeholder='brucewayne1939@gmail.com' />
						</div>


					</div>
				</div>


				<div className='mt-4 bg-[#182724] p-4  rounded-md w-[55vw] h-full px-8 '>
					<p className='font-semibold text-xl'>
						Url
					</p>

					<div className='mt-6 flex flex-col gap-y-6'>
						<div className='flex flex-col gap-y-2'>

							<label htmlFor="user">Website</label>
							<input type="text" value={website} disabled={!isEditable} onChange={(e) => {
								setWebsite(e.target.value)
							}} className='h-11 outline-none border pl-2 rounded-lg bg-[#0C1615] placeholder:text-white placeholder:opacity-60' placeholder='..' />
						</div>


						<div className='flex flex-col gap-y-2'>

							<label htmlFor="user">Linkedin</label>
							<input type="text" value={linkedin} disabled={!isEditable} onChange={e => setLinkedin(e.target.value)} className='h-11 outline-none border pl-2 rounded-lg bg-[#0C1615] placeholder:text-white placeholder:opacity-60' placeholder='..' />
						</div>


						<div className='flex flex-col gap-y-2'>

							<label htmlFor="user">Github</label>
							<input type="text" value={github} disabled={!isEditable} onChange={(e) => {
								setGitHub(e.target.value)
							}} className='h-11 outline-none border pl-2 rounded-lg bg-[#0C1615] placeholder:text-white placeholder:opacity-60' placeholder='..' />
						</div>



					</div>
				</div>

				<div className='mt-4 bg-[#182724] p-4  rounded-md w-[55vw] h-full px-8 '>
					<p className='font-semibold text-xl'>
						About Yourself
					</p>

					<div className='mt-6 flex flex-col gap-y-6'>
						<div className='flex flex-col gap-y-2'>

							<label htmlFor="user">Bio</label>
							<textarea value={bio} disabled={!isEditable} maxLength={300} onChange={(e) => {
								setBio(e.target.value)
							}} className='h-11 outline-none border pl-2 rounded-lg bg-[#0C1615] placeholder:text-white placeholder:opacity-60' placeholder='Write about Yourself' />
						</div>


						<div className='flex flex-col gap-y-2'>

							<label htmlFor="user">Coding Languages/Skills</label>
							<input type="text" value={skills} disabled={!isEditable} onChange={(e) => {
								setSkills(e.target.value)
							}} className='h-11 outline-none border pl-2 rounded-lg bg-[#0C1615] placeholder:text-white placeholder:opacity-60' placeholder='Javascript, React, Java, Spring Boot ....' />
						</div>


					</div>
				</div>


				<div className=" flex justify-center  mt-7">
					{/* <Buttons
                buttonText={prices && "Edit"}
                onclick={() => {
                  setmodal({ show: true, datamodal: null });
                }}
                className={
                  "text-white border-yellow-300 self-center bg-yellow-400 px-10 py-2  w-48  h-11 rounded-3xl"
                }
              ></Buttons> */}
					{
						!isEditable ? <button className={
							"text-white border-yellow-300 self-center bg-gray-400 px-10 py-2  w-48  h-11 rounded-3xl"
						} onClick={setEditable}>

							Edit
						</button> : <button type='button' disabled={isPending} onClick={updateProfile} className={
							"text-white border-yellow-300 self-center bg-yellow-400 px-10 py-2  w-48  h-11 rounded-3xl"
						} >

							save
						</button>

					}


				</div>
			</div>
			<Toaster richColors position='top-center' />

		</>
	)
}

export default Profile