import Link from 'next/link'
import React from 'react'
import { FaHome } from 'react-icons/fa'
interface cn {
	className : string
}
const CreatePostCard = ({className} : cn) => {
	return (
		<>
			<div className={`overflow-hidden h-fit rounded-lg border  border-gray-200 order-first md:order-last pb-2 ${className}`}>
				<div className='bg-emerald-100 px-6 py-4'>
					<p className='font-semibold py-3 flex items-center gap-1.5'>
						<FaHome className='h-4 w-4' />
						Home
					</p>
				</div>
				<dl className='-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6 bg-white'>
					<div className='flex justify-between gap-x-4 py-3'>
						<p className='text-zinc-500'>
							Your personal Breadit frontpage. Come here to check in with your
							favorite communities.
						</p>
					</div>

					<Link
						className={
							'w-full mt-4 mb-6 bg-black text-white text-2xl py-1.5 px-3 rounded-md'
						}
						href={`/create`}>
						Create Post
					</Link>
				</dl>
			</div>

		</>
	)
}

export default CreatePostCard