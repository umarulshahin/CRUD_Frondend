import React from 'react'

const Header = () => {
  return (
    <div className='flex w-screen'>
        <span className='text-2xl font-medium pl-6' >Dashboard</span>
        <div className=' w-6/12 flex justify-end '>
        <span className='font-bold text-3xl'>Welcome Home</span> 

        </div>
        <div className='w-4/12 flex justify-end pr-6' >
        <button className='bg-red-700 px-4 py-1 rounded-lg text-white' >Logout</button>

        </div>

        </div>

  )
}

export default Header