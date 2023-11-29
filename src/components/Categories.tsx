'use client'
// import React, { useState } from 'react'
// import { IoHomeOutline, IoBodyOutline} from 'react-icons/io5'
// import { GrTechnology } from "react-icons/gr";
// import { RiSpaceShipLine , RiGhostLine} from "react-icons/ri";
// import { BsCurrencyRupee } from "react-icons/bs";
// import { MdOutlineSportsBaseball } from "react-icons/md";
// import { RiMenuFoldLine } from "react-icons/ri";
// import { RiMenuUnfoldLine } from "react-icons/ri";

// interface props {
// 	className : any,

// }
// const Categories = () => {

// 	const [showSidebar, setShowSidebar] = useState(true)
// 	const showButton = () =>{
// 	  setShowSidebar(!showSidebar)
// 	}
// 	return (
// 		<>
//     <button onClick={showButton} className={`${!showSidebar ? 'block text-3xl p-3' : 'hidden'}`}>
//       <RiMenuUnfoldLine />
//     </button>


// 			<div className={`w-[20vw]  bg-[#19192B] h-[90vh] rounded-r-lg relative  ${showSidebar ? 'block ' : 'hidden'}`}>
// <button className='text-white text-3xl absolute right-2 top-2'onClick={showButton}  >

// <RiMenuFoldLine />
// </button>


// 				<div className='flex flex-col pt-10 items-center  h-full text-white pr-12 '>


// 					<p className=' border-b border-gray-200 border-opacity-40    w-[100%]  text-center py-4 text-xl cursor-pointer  flex items-center justify-center gap-x-3'>
// 						<IoHomeOutline />	Home
// 					</p >
// 					<p className='    w-[100%]  text-center py-4 text-xl cursor-pointer   flex items-center justify-center gap-x-3'>
// 					<GrTechnology />Tech
// 					</p>

// 					<p className='    w-[100%]  text-center py-4 text-xl cursor-pointer   flex items-center justify-center gap-x-3'>
// 					<IoBodyOutline/>	Health
// 					</p>


// 					<p className='     w-[100%]  text-center py-4 text-xl cursor-pointer  flex items-center justify-center gap-x-3 '>
// 					<RiSpaceShipLine />Space
// 					</p>

// 					<p className='     w-[100%]  text-center py-4 text-xl cursor-pointer  flex items-center justify-center gap-x-3 '><RiGhostLine/> Mysteries</p>

// 					<p className='     w-[100%]  text-center py-4 text-xl cursor-pointer   flex items-center justify-center gap-x-3'>
// 					<BsCurrencyRupee />	Finance
// 					</p>

// 					<p className=' w-[100%]  text-center py-4 text-xl cursor-pointer   flex items-center justify-center gap-x-3'>

// 					<MdOutlineSportsBaseball />
// 	Sports
// 					</p>

// 				</div>
// 			</div>
// 		</>
// 	)
// }

// export default Categories

// Import necessary modules
import React, { useState } from 'react';
import { IoHomeOutline, IoBodyOutline } from 'react-icons/io5';
import { GrTechnology } from 'react-icons/gr';
import { RiSpaceShipLine, RiGhostLine } from 'react-icons/ri';
import { BsCurrencyRupee } from 'react-icons/bs';
import { MdOutlineSportsBaseball } from 'react-icons/md';
import { RiMenuFoldLine, RiMenuUnfoldLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

// Component definition
const Categories = () => {
	// State for managing sidebar visibility
	const [showSidebar, setShowSidebar] = useState(true);

	// Function to toggle sidebar visibility
	const showButton = () => {
		setShowSidebar(!showSidebar);
	};

	// Framer Motion variants for animation
	const variants = {
		open: { x: 0 },
		closed: { x: '-50%' },
	};

	return (
		<>
			{/* Button to toggle sidebar visibility */}
			{/* <button onClick={showButton} className={`${!showSidebar ? 'block text-3xl p-3' : 'hidden'}`}>
				<RiMenuUnfoldLine />
			</button> */}

			{/* Sidebar with Framer Motion animation */}
			<motion.div
				className={`w-[20vw] bg-white h-[80vh] shadow text-black rounded-lg relative ${showSidebar ? 'block' : 'hidden'}`}
				initial="open"
				animate={showSidebar ? 'open' : 'closed'}
				variants={variants}
			>
				{/* <button className="text-white text-3xl absolute right-2 top-2" onClick={showButton}>
					<RiMenuFoldLine />
				</button> */}

				<div className="flex flex-col pt-10 items-center h-full text-black pr-12">
					{/* Your category items */}
					<p className="border-b border-gray-400 border-opacity-40 w-[100%] text-center py-4 text-xl cursor-pointer flex items-center justify-center gap-x-3">
						<IoHomeOutline /> Home
					</p>
					<p className='    w-[100%]  text-center py-4 text-xl cursor-pointer   flex items-center justify-center gap-x-3'>
						<GrTechnology />Tech
					</p>

					<p className='    w-[100%]  text-center py-4 text-xl cursor-pointer   flex items-center justify-center gap-x-3'>
						<IoBodyOutline />	Health
					</p>


					<p className='     w-[100%]  text-center py-4 text-xl cursor-pointer  flex items-center justify-center gap-x-3 '>
						<RiSpaceShipLine />Space
					</p>

 					<p className='     w-[100%]  text-center py-4 text-xl cursor-pointer  flex items-center justify-center gap-x-3 '><RiGhostLine /> Mysteries</p>

 					<p className='     w-[100%]  text-center py-4 text-xl cursor-pointer   flex items-center justify-center gap-x-3'>
 					<BsCurrencyRupee />	Finance
 					</p>

					<p className=' w-[100%]  text-center py-4 text-xl cursor-pointer   flex items-center justify-center gap-x-3'>

						<MdOutlineSportsBaseball />
						Sports
					</p>
				</div>
			</motion.div>
		</>
	);
};

export default Categories;
