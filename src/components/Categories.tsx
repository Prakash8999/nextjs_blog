'use client'
import React, { useState } from 'react';
import { IoHomeOutline, IoBodyOutline } from 'react-icons/io5';
import { GrTechnology } from 'react-icons/gr';
import { RiSpaceShipLine, RiGhostLine } from 'react-icons/ri';
import { BsCurrencyRupee } from 'react-icons/bs';
import { MdOutlineSportsBaseball } from 'react-icons/md';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { IoIosMenu } from "react-icons/io";
import Link from 'next/link';
import { User, getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
// Component definition

const Categories = ({ session }: any) => {
	// State for managing sidebar visibility
	const [query, setQuery] = useState("")
	const router = useRouter();
	const [showSidebar, setShowSidebar] = useState(true);
	const [showMore, setShowMore] = useState(false)
	const pathname = usePathname();
	const { replace } = useRouter();
	// Function to toggle sidebar visibility
	const showButton = () => {
		setShowSidebar(!showSidebar);
	};


	// Framer Motion variants for animation
	const variants = {
		open: { x: 0 },
		closed: { x: '-50%' },
	};

	const searchParams = useSearchParams()
	console.log();
	const setTail = searchParams.get('category')


	const params = new URLSearchParams(searchParams.toString())
	const searchCat = (category: string) => {

		params.set('category', category)
		replace(`${pathname}?${params.toString()}`);
	}
	console.log(session);

	const onSearch = (e: React.FormEvent) => {
		e.preventDefault()

		// router.push(`/draft?userId=${session?.user?.id}`)
		router.push(`/draft`)
		// console.log(query);

	}

	return (
		<>
			{/* Button to toggle sidebar visibility */}
			{/* <button onClick={showButton} className={`${!showSidebar ? 'block text-3xl p-3' : 'hidden'}`}>
				<RiMenuUnfoldLine />
			</button> */}

			{/* Sidebar with Framer Motion animation */}
			<motion.div
				className={`w-[20vw] via-transparent  h-[80vh] shadow text-black rounded-lg relative ${showSidebar ? 'block' : 'hidden'}`}
				initial="open"
				animate={showSidebar ? 'open' : 'closed'}
				variants={variants}
			>
				{/* <button className="text-white text-3xl absolute right-2 top-2" onClick={showButton}>
					<RiMenuFoldLine />
				</button> */}

				<div className="flex flex-col pt-3 items-center h-full text-black pr-12 gap-y-3">
					{/* Your category items */}
					<button
						onClick={() => {
							params.delete('category');
							replace(`${pathname}?${params.toString()}`);
						}}
						className="border-b border-gray-400 border-opacity-40 w-[100%] text-center py-2 text-xl cursor-pointer flex items-center justify-center gap-x-3">
						<IoHomeOutline /> Home
					</button>
					<button onClick={() => {
						searchCat('tech')
					}} className={`    ${setTail == 'tech' ? 'border shadow-lg' : ''}  text-center py-2 w-44 px-2 rounded-md text-xl cursor-pointer   flex items-center justify-center gap-x-3`}>
						<GrTechnology />Tech
					</button>

					<button
						onClick={() => {
							searchCat('health')
						}}
						className={`    ${setTail == 'health' ? 'border shadow-lg' : ''}  text-center py-2 w-44 px-2 rounded-md text-xl cursor-pointer   flex items-center justify-center gap-x-3`}>
						<IoBodyOutline />	Health
					</button>


					<button
						onClick={() => {
							searchCat('space')
						}}
						className={`    ${setTail == 'space' ? 'border shadow-lg' : ''}  text-center py-2 w-44 px-2 rounded-md text-xl cursor-pointer   flex items-center justify-center gap-x-3`}>
						<RiSpaceShipLine />Space
					</button>

					<button

						onClick={() => {
							searchCat('mysteries')
						}}
						className={`    ${setTail == 'mysteries' ? 'border shadow-lg' : ''}  text-center py-2 w-44 px-2 rounded-md text-xl cursor-pointer   flex items-center justify-center gap-x-3`}><RiGhostLine /> Mysteries</button>

					<button onClick={() => {
						searchCat('finance')
					}} className={`    ${setTail == 'finance' ? 'border shadow-lg' : ''}  text-center py-2 w-44 px-2 rounded-md text-xl cursor-pointer   flex items-center justify-center gap-x-3`}>
						<BsCurrencyRupee />	Finance
					</button>

					<button
						onClick={() => {
							searchCat('sports')
						}}
						className={`${setTail == 'sports' ? 'border shadow-lg' : ''}  text-center py-2 px-2 rounded-md text-xl cursor-pointer w-44    flex items-center justify-center gap-x-3`}>

						<MdOutlineSportsBaseball />
						Sports
					</button>



					<div className='relative mt-24 bottom-0 flex gap-x-3'>

						<button
							onClick={() => setShowMore(!showMore)}
							className='text-center py-2 px-2 rounded-md text-xl cursor-pointer   flex items-center justify-center gap-x-3'>
							<IoIosMenu />
							More
						</button>
						<div className={`${showMore ? 'block' : 'hidden'} bg-gray-100 shadow-lg absolute ml-24 border-2 rounded-lg h-32 w-28 flex flex-col justify-center items-center gap-y-2`} >
							<Link href={'/profile'} className='py-0.5 border-b hover:shadow-md px-2 rounded-md duration-100'>
								Profile
							</Link>
							<button className='py-0.5 border-b  hover:shadow-md px-2 rounded-md duration-100'>
								Saved
							</button>
							<button
								onClick={onSearch}

								className='py-0.5 border-b hover:shadow-md px-2 rounded-md duration-100' >
								Draft
							</button>

						</div>

					</div>
				</div>

				<div className='fixed'>

				</div>

			</motion.div>

		</>
	);
};

export default Categories;
