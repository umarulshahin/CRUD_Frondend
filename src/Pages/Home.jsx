import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import edit_icon from "../assets/icons8-edit-50.png";
import email_icon from "../assets/icons8-email-50.png";
import phone_icon from "../assets/icons8-phone-50.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useGetUserdata from "../Hooks/useGetUserdata.js";
import avatar from "../assets/Avatar-Profile.png"
import useUpdateToken from "../Hooks/useUpdateToken.js";
import { Image_validate } from "../Hooks/validator.js";
import { toast } from "react-toastify";
import { backendUrl } from "../Redux/Constants.js";

const Home = () => {
  const navigate=useNavigate()
  const user=useSelector((state)=>state.User_data.user)
  const {Get_data}=useGetUserdata()
  const data=useSelector((state)=> state.User_data.user_details)
  const {username,email,phone,profile}=data[0]
  const [profileImage, setProfileImage] = useState(avatar);
  const {RefreshToken}=useUpdateToken()
  const {img_validate}=Image_validate()
  const [loading,setLoading]=useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(()=>{
     
    
    if (loading){
      RefreshToken(setLoading,loading)

    }
    const fourminuts = (1000 * 60 *4) 
    const interval= setInterval(()=>{
      RefreshToken(setLoading,loading)
    },fourminuts)

    return ()=>{
      clearInterval(interval)
    }
  },[loading,user])

  useEffect(()=>{
    Get_data()
    if (!user){
        navigate("login/")
    }
   
  },[])
  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      const allowedExtensions = /.(jpg|jpeg|png|gif|webp)$/;
      if (!allowedExtensions.test(file.name)) {
         
        toast.warning("Please upload an image file (JPEG, JPG, PNG, GIF,webp).")
        return;
      }else{
      reader.onload = (e) => {
        img_validate(file)

      };

      reader.readAsDataURL(file);
    }
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div className=" flex justify-center py-6 shadow-xl">
        <Header />
      </div>
      <div className="flex h-1/2 justify-center m-10 items-center">
        <div className=" p-20 rounded-lg bg-gray-300 shadow-2xl flex flex-col items-center">
          <img
            src={profile ? `${backendUrl}${profile}`: profileImage}
            alt="User Profile"
            className="h-32 w-32 rounded-full object-cover  cursor-pointer border-2 border-gray-500 mb-4"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            type="file"
            accept="image/*"
            id="fileInput"
            className="hidden border"
            onChange={handleImageChange}
          />
              
          <ul className="text-center space-y-4">
            <li className="text-lg font-medium">{username}</li>
          </ul>
         <ul className="space-y-4 mt-4">
                
                <li className="text-lg font-medium flex items-center">
                    <img
                        src={email_icon}
                        alt="Email"
                        className="h-8 w-8 cursor-pointer border border-gray-300 mr-2"
                    />
                    {email}
                </li>
                <li className="text-lg font-medium flex items-center">
                    <img
                      
                        src={phone_icon}
                        alt="Phone"
                        className="h-8 w-8  cursor-pointer border border-gray-300 mr-2"
                    />
                    {phone}
                </li>
            </ul>
          <div>
            <img
              src={edit_icon}
              alt="Edit"
              className="absolute ml-24 mt-8 h-8 w-8 cursor-pointer  border border-gray-300"
              onClick={handleEdit}
            />
          </div>
        </div>
      </div>

       {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-1/4">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
            <form >
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  
                  
                  className="mt-1 block h-8 w-full border-gray-300 rounded-md shadow-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  
                  className="mt-1 h-8 w-full block border-gray-300 rounded-md shadow-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                 
                  className="mt-1 block h-8 w-full border-gray-300 rounded-md shadow-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mt-6">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Changes</button>
                <button type="button" className="ml-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-400 text-gray-600 " onClick={closeModal}>Cancel</button>
              </div> 
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
