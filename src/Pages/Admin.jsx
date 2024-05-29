import React from 'react';
import { Link } from 'react-router-dom';
import admin_img from '../assets/Admin_img.png';

const Admin = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-grow flex-col md:flex-row">
        <div className="hidden md:block w-full md:w-1/2">
          <img className="h-full w-full object-cover" src={admin_img} alt="Admin Login" />
        </div>
        <div className="w-full md:w-1/2 flex justify-center items-center relative">
          <form className="p-4 md:p-10 flex flex-col gap-4 md:gap-6 bg-gray-200 rounded-lg shadow-lg w-full max-w-md">
            <span className="text-2xl md:text-4xl font-medium py-4 md:py-6">Admin Sign in</span>
            <input type="email" placeholder="Email" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg w-full" />
            <input type="password" placeholder="Password" className="h-10 md:h-12 border px-4 md:px-6 border-gray-300 rounded-lg w-full" />
            <button className="bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Admin;
