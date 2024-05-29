import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login_img from '../assets/Login.jpg';
import Signup_validator from '../Hooks/validator';
import { useSelector } from 'react-redux';

const Signup = () => {
   const [Errormessage,setErrormessage]=useState("") 
   const username = useRef()
   const lastname = useRef()
   const email = useRef()
   const phone = useRef()
   const password = useRef()
   const con_password = useRef()
   const navigate=useNavigate()
   const user =useSelector((state)=>state.User_data.user)
useEffect(()=>{
  
    if(user){
     
        navigate("/")
    }

},[])

const HandleSignup=()=>{
   
   const message=Signup_validator(
    username.current.value,
    lastname.current.value,
    email.current.value,
    phone.current.value,
    password.current.value,
    con_password.current.value,
    navigate
   ) 
    setErrormessage(message)
   if (message) return;

}

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          <form onSubmit={(e)=>e.preventDefault()} className="p-4 md:p-10 flex flex-col gap-2 md:gap-4 bg-gray-300 rounded-lg shadow-2xl w-full max-w-md">
            <span className="text-2xl md:text-4xl font-medium py-4 md:py-6">Create your account</span>
            <input ref={username} type="text" placeholder="Username" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg w-full" />
            <input ref={lastname} type="text" placeholder="Last Name" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg w-full" />
            <input ref={email} type="email" placeholder="Email" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg w-full" />
            <input ref={phone} type="number" placeholder="Phone number" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg w-full" />
            <input ref={password} type="password" placeholder="Password" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg w-full" />
            <input ref={con_password} type="password" placeholder="Confirm Password" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg w-full" />
               <div className='flex justify-center'>
               <p className='text-red-600'>{Errormessage}</p>
               </div>

            <button onClick={HandleSignup} className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  >Sign up</button>
            <div className="flex justify-end">
              <span className="text-gray-400">Already have an account? <Link to="/login" className='text-rose-800 font-medium'>Sign in</Link></span>
            </div>
          </form>
        </div>
        <div className="hidden md:block w-full md:w-1/2">
          <img className="h-full w-full object-cover" src={login_img} alt="Login" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
