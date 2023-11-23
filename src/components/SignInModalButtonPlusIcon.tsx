"use client"

import LoginModal from '@/app/modal/LoginModal'
import React, { useState } from 'react'
import { IoAddOutline } from 'react-icons/io5'


const SigninModalButtonPlusIcon = () => {

const [modal, setModal] = useState ({show:false})


  return (

	<>
	{
modal.show && <LoginModal data={modal.show} setModal={setModal} />
	}
	<button className='flex items-center ' onClick={()=>{
		setModal({show:true})
	}} > <IoAddOutline className = {'text-5xl ' } /> Write </button>
	</>

  )
}

export default SigninModalButtonPlusIcon