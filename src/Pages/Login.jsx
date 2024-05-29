import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import login_img from '../assets/Login.jpg';
import useUserManage from '../Hooks/useUserManage';
import { useSelector } from 'react-redux';

const Signup = () => {
   
  const [Errormessage,setErrormessage]=useState("") 
  const email=useRef()
  const password=useRef()
  const {get_token} = useUserManage()
  const user = useSelector(state => state.User_data.user);
  const navigate=useNavigate()
   useEffect(()=>{
        
    if (user){
        navigate("/")

    }

 },[])

  const handleSignin= async ()=>{

    console.log(email.current.value)
    console.log(password.current.value)
      const Error= await get_token(email.current.value,password.current.value)

      setErrormessage(Error)
  }  

  return (
    <div className="flex flex-col h-screen">
      
      <div className="flex flex-grow flex-col md:flex-row">
        <div className="hidden md:block w-full md:w-1/2">
          <img className="h-full w-full object-cover" src={login_img} alt="Login" />
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          <form onSubmit={(e)=>e.preventDefault()} className="p-4 md:p-10 flex flex-col gap-4 md:gap-6 bg-gray-300 rounded-lg shadow-2xl w-full max-w-md">
            <span className="text-2xl md:text-4xl font-medium py-4 md:py-6">Sign in your account</span>
            <input ref={email} type="email" placeholder="Email" className="h-10 md:h-12 border px-4 md:px-6 border-gray-200 rounded-lg" />
            <input ref={password} type="password" placeholder="Password" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg" />
            <div className='flex justify-center'>
               <p className='text-red-600'>{Errormessage}</p>
               </div>
            <button onClick={handleSignin} className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign in</button>
            <div className="flex justify-end">
              <span className="text-gray-400">Don't have an account? <Link to="/signup" className='text-rose-800 font-medium'>Sign up</Link></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
