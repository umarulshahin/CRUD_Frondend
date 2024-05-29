import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addUser } from '../Redux/SliceUser'
import Cookies from 'js-cookie';


const Header = () => {
    
  const user=useSelector((state)=>state.User_data.user)
  const navigate=useNavigate()
  const dispatch =useDispatch() 

  const handleLogout=()=>{

    if (user){
        dispatch(addUser(null))
        Cookies.remove("UserCookie")
        navigate('login/')
    }

  }
  return (
    <div className='flex w-screen'>
        <span className='text-2xl font-medium pl-6' >Dashboard</span>
        <div className=' w-6/12 flex justify-end '>
        <span className='font-bold text-3xl'>Welcome Home</span> 

        </div>
        <div className='w-4/12 flex justify-end pr-6' >
        <button onSubmit={(e)=>e.preventDefault()} onClick={handleLogout} className='bg-red-700 px-4 py-1 rounded-lg text-white cursor-pointer' >Logout</button>

        </div>

        </div>

  )
}

export default Header