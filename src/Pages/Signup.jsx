import React from 'react';
import { Link } from 'react-router-dom';
import login_img from '../assets/Login.jpg';

const Signup = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow flex-col md:flex-row">
        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          <form className="p-4 md:p-10 flex flex-col gap-4 md:gap-6 bg-gray-200 rounded-lg shadow-md w-full max-w-md">
            <span className="text-2xl md:text-4xl font-medium py-4 md:py-6">Create your account</span>
            <input type="text" placeholder="Username" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg w-full" />
            <input type="text" placeholder="Last Name" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg w-full" />
            <input type="email" placeholder="Email" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg w-full" />
            <input type="password" placeholder="Password" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg w-full" />
            <input type="password" placeholder="Confirm Password" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg w-full" />
            <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign up</button>
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
