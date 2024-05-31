import React, { useEffect, useRef, useState } from 'react';
import admin_img from '../assets/Admin_img.png';
import useUserManage from '../Hooks/useUserManage';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Admin = () => {
  const[admin,setadmin]=useState(true)
  const[Errormessage,setErrormessage]=useState()
  const email=useRef()
  const password=useRef()
  const {get_token}=useUserManage()
  const admin_data = useSelector((state)=>state.Admin_data.admin)
  const navigate=useNavigate()
  const handleAdmin_login= async()=>{
      
    const error= await get_token(email.current.value,password.current.value,admin)
    setErrormessage(error)

  }

  useEffect(()=>{
     if (admin_data){
      navigate("/Admin_home")

     }
    },[])
  
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow flex-col md:flex-row">
        <div className="hidden md:block w-full md:w-1/2">
          <img className="h-screen w-screen object-cover" src={admin_img} alt="Admin Login" />
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          <form onSubmit={(e)=>e.preventDefault()} className="p-4 md:p-10 flex flex-col gap-4 md:gap-6 bg-gray-200 rounded-lg shadow-lg w-full max-w-md">
            <span className="text-2xl md:text-4xl font-medium py-4 md:py-6">Admin Sign in</span>
            <input ref={email} type="email" placeholder="Email" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg w-full" />
            <input ref={password} type="password" placeholder="Password" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg w-full" />
            <div className='flex justify-center'>
               <p className='text-red-600'>{Errormessage}</p>
               </div>
            <button onClick={handleAdmin_login} className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
