"use client"

import LoginModal from '@/app/modal/LoginModal'
import React, { useState } from 'react'


const SigninModalButton = () => {

const [modal, setModal] = useState ({show:false})


  return (

	<>
	{
modal.show && <LoginModal data={modal.show} setModal={setModal} />
	}
	<button onClick={()=>{
		setModal({show:true})
	}} className='bg-black bg-opacity-90 text-white px-7 py-2 shadow hover:shadow-lg rounded-3xl border border-white'>Sign In</button>
	</>

  )
}

export default SigninModalButton