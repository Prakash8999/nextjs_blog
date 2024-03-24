"use client"

import React, { useEffect, useState } from 'react'



import { FcGoogle } from 'react-icons/fc'
import { Toaster, toast } from 'sonner';
import { useRouter } from 'next/navigation'
import { FaChrome } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { signIn } from "next-auth/react"
const SignIn = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [buttonDisable, setButtonDisable] = useState<boolean>(true)
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [githubloadig, setGithubLoading] = useState(false)

	const loginwithgoogle = async () => {
		setLoading(true)
		try {
			await signIn('google').then((res) => {
				console.log(res);

			}).then((res) => {
				console.log(res);

			})
		} catch (error) {
			console.log(error);

		}
	}

	const loginwithgithub = async () => {


		setGithubLoading(true)
		try {
			await signIn('github').then((res) => {
				console.log(res);

			})
		} catch (error) {
			console.log(error);

		}

	}

	return (
		<>
			<div className='container mx-auto flex flex-col w-fit justify-center px-10 gap-y-4 h-full '>
				<FaChrome className='h-5 w-5 md:h-10 md:w-10 text-[#03DAB5] ' />
				<h1 className='text-2xl font-semibold text-black'> Welcome Back</h1>

				<p className='text-sm max-w-xs text-black'>By continuing, you are setting up a Redlone account and agree to our User Agreement and Privacy Policy</p>


				<button onClick={loginwithgoogle} disabled={loading} className='flex items-center w-full h-14 justify-center gap-x-4 text-xl bg-zinc-900 text-zinc-100 hover:bg-zinc-800 py-2  rounded-2xl ' >
					<FcGoogle className='text-2xl' />
					<p>{loading ? 'Loading...' : 'Google'}</p></button>



				<div className='flex  flex-col '>


					<p className='text-center'>or</p>



					<form action="" className='flex flex-col gap-y-4 pt-2'>

						<input type="text" value={email} onChange={(e) => {
							e.preventDefault()
							setEmail(e.target.value)
						}} className='h-14 bg-zinc-200 rounded-2xl placeholder:text-gray-400 px-3 outline-none' placeholder='Username' />
						<input type="password" className='h-14 bg-zinc-200 rounded-2xl placeholder:text-gray-400 px-3 outline-none' placeholder='Password' />
						<div className='text-sm flex gap-x-2 justify-center -mt-3'>
							<p>Does not have a account</p>
							<button className='text-blue-600'>
								Signup
							</button>

						</div>
						<button className='h-14  rounded-full bg-[rgba(217,58,0,255)]  px-3 -mt-3'  >Login</button>
					</form>
					{/* <p>new to Redlone ? </p>{' '} */}

					{/* <Link href={'/signup'} className='underline underline-offset-4'> Sign Up</Link> */}
				</div>
			</div>
			<Toaster richColors position='top-center' />
		</>
	)
}

export default SignIn