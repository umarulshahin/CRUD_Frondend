import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import { addAdmin } from '../Redux/AdminSlice';


const Header_admin = () => {
    
  const user=useSelector((state)=>state.Admin_data.admin)
  const navigate=useNavigate()
  const dispatch =useDispatch() 

  const handleLogout=()=>{
    if (user){
        dispatch(addAdmin(null))
        Cookies.remove("AdminCookie")
        navigate('/Admin')
    }

  }
  return (
    <div className='flex w-screen'>
        <span className='text-2xl font-medium pl-6' >Admin Dashboard</span>
        <div className=' w-6/12 pr-28 flex justify-end '>
        <span className='font-bold text-3xl'>User Details </span> 

        </div>
        <div className='w-4/12 flex justify-end pr-6' >
        <button onSubmit={(e)=>e.preventDefault()} onClick={handleLogout} className='bg-red-700 px-4 py-1 rounded-lg text-white cursor-pointer' >Logout</button>

        </div>

        </div>

  )
}

export default Header_admin