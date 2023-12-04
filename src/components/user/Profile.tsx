'use client'

import React, { useState } from 'react'

import Image from 'next/image'
interface user {
	// user: Pick<User, 'email' | 'image' | 'name' >

	session: any
}


const Profile = ({ session }: user) => {
	console.log(session);
const [isEditable, setIsEditable] = useState<boolean>(false)

const setEditable = () =>{
	setIsEditable(!isEditable)
}


	return (
		<>
			<div className='flex pb-5 flex-col items-center  gap-y-6 '>
				<div className='mt-4 bg-white p-4  rounded-md w-[55vw] h-full px-8 '>
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
							<input type="text" value={session?.user?.name} disabled={true} className='h-11 outline-none border pl-2 rounded-lg' placeholder='Bruce Wayne' />
						</div>


						<div className='flex flex-col gap-y-2'>

							<label htmlFor="user">UserName</label>
							<input type="text" value={session?.user?.username} className='h-11 outline-none border pl-2 rounded-lg' placeholder='thebruce' />
						</div>

						<div className='flex flex-col gap-y-2'>

							<label htmlFor="user">Email</label>
							<input type="text" value={session?.user?.email} className='h-11 outline-none border pl-2 rounded-lg' placeholder='brucewayne1939@gmail.com' />
						</div>


					</div>
				</div>


				<div className='mt-4 bg-white p-4  rounded-md w-[55vw] h-full px-8 '>
					<p className='font-semibold text-xl'>
						Url
					</p>

					<div className='mt-6 flex flex-col gap-y-6'>
						<div className='flex flex-col gap-y-2'>

							<label htmlFor="user">Website</label>
							<input type="text" className='h-11 outline-none border pl-2 rounded-lg' placeholder='..' />
						</div>


						<div className='flex flex-col gap-y-2'>

							<label htmlFor="user">Linkedin</label>
							<input type="text" className='h-11 outline-none border pl-2 rounded-lg' placeholder='..' />
						</div>

						<div className='flex flex-col gap-y-2'>

							<label htmlFor="user">Github</label>
							<input type="text" className='h-11 outline-none border pl-2 rounded-lg' placeholder='..' />
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
                !isEditable ?   <button   className={
                  "text-white border-yellow-300 self-center bg-gray-400 px-10 py-2  w-48  h-11 rounded-3xl"
                } onClick={setEditable}>

                Edit
              </button> :   <button   className={
                  "text-white border-yellow-300 self-center bg-yellow-400 px-10 py-2  w-48  h-11 rounded-3xl"
                } >

                save
              </button>
                  
              }

            
            </div>
			</div>

		</>
	)
}

export default Profile