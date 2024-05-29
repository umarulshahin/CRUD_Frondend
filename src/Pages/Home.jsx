import React, { useState } from "react";
import Header from "../Components/Header";
import edit_icon from "../assets/icons8-edit.gif";

const Home = () => {
  const [profileImage, setProfileImage] = useState();

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        setProfileImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <div>
      <div className=" flex justify-center py-6 shadow-2xl">
        <Header />
      </div>
      <div className="flex h-1/2 justify-center m-10 items-center">
        <div className=" p-20 rounded-lg bg-white shadow-2xl flex flex-col items-center">
          <img
            src={profileImage}
            alt="User Profile"
            className="h-32 w-32 rounded-full object-cover  cursor-pointer border-2 border-gray-500 mb-4"
            onClick={() => document.getElementById("fileInput").click()}
          />
          <input
            type="file"
            id="fileInput"
            className="hidden border"
            onChange={handleImageChange}
          />
          <ul className="text-center space-y-2">
            <li className="text-lg font-medium">Name</li>
            <li className="text-lg font-medium">Email</li>
            <li className="text-lg font-medium">Number</li>
          </ul>
          <div>
            <img
              src={edit_icon}
              alt="Edit"
              className="absolute ml-16 mt-8 h-8 w-8 bg-white rounded-full border border-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
