"use client"
import React from 'react'

import SignIn from '@/components/SignIn'

 import { MdCancel } from "react-icons/md"; 
const LoginModal = ({ setModal }: any) => {

	const loginwithgoogle = async () => {
		try {



		} catch (error) {
			console.log(error);

		}
	}
	return (
		<>
			<div className='h-screen w-screen bg-black bg-opacity-60 flex justify-center items-center fixed top-0 left-0 z-[100]'>
				<div className='h-[85vh] w-[70vh] bg-white rounded-2xl'>
					<div className='relative '>

						<button type='button' className='absolute right-3 top-3 text-3xl ' onClick={() => {
							setModal({ show: false })
						}}>

							<MdCancel className='text-black w-8 h-8  text-center p-1' />

						</button>

					</div>



					<SignIn />


				</div>

			</div>

		</>
	)
}

export default LoginModal