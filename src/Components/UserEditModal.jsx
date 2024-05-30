
import { useState } from 'react';
import { useSelector } from 'react-redux';
import useUserUpdate from '../Hooks/useUserUpdate';
import { toast } from 'react-toastify';

const UserEditModal = (props) => {
    
   
    const data=useSelector((state)=> state.User_data.user_details)
    const {username,email,phone,id}=data   
    const [name,setname]=useState(username)
    const [Email,setEmail]=useState(email)
    const [Phone,setPhone]=useState(phone)
    const {setIsModalOpen}=props
    const {userUpdate}=useUserUpdate()

    const closeModal = () => {
        setIsModalOpen(false);
      };

      const handleChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
          case 'username':
            setname(value);
            break;
          case 'email':
            setEmail(value);
            break;
          case 'phone':
            setPhone(value);
            break;
          default:
            break;
        }
      };

    const handleSubmit = (e) => {

        e.preventDefault();
       
       if (name && Email && Phone){

         userUpdate(name,Email,Phone,id)

       }
       else{
          toast.warning("Enter valid User details")
       }
       closeModal()
       
    }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-8 rounded shadow-lg w-1/4">
            <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleSubmit} >
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                value={name}
                onChange={handleChange}
                  type="text"
                  id="username"
                  name="username"
                  
                  
                  className="mt-1 block h-8 w-full border-gray-300 rounded-md shadow-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  value={Email}
                  onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  
                  className="mt-1 h-8 w-full block border-gray-300 rounded-md shadow-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  value={Phone}
                  onChange={handleChange}
                  type="number"
                  id="phone"
                  name="phone"
                 
                  className="mt-1 block h-8 w-full border-gray-300 rounded-md shadow-xl focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div className="mt-6">
                <button  type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Changes</button>
                <button type="button" className="ml-2 px-4 py-2 border border-gray-300 rounded hover:bg-gray-400 text-gray-600 " onClick={closeModal}>Cancel</button>
              </div> 
            </form>
          </div>
        </div>
  )
}

export default UserEditModal