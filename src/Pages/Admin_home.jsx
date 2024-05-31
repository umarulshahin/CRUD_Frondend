import React, { useEffect, useState } from 'react'
import Header_admin from '../Components/Header_admin'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetUserdata from '../Hooks/useGetUserdata'
import { admin_details_URLS } from '../Redux/Constants'
import useUpdateToken from '../Hooks/useUpdateToken'
import { addAdmin } from '../Redux/AdminSlice'

const Admin_home = () => {
  const admin_data = useSelector((state)=>state.Admin_data.admin)
  const user_data = useSelector((state)=>state.Admin_data.admin_details)
  const {RefreshToken}=useUpdateToken()
  console.log( user_data)
  const navigate=useNavigate()
  const {Get_data}=useGetUserdata()
  const [admin,setadmin]=useState(true)
  const [loading,setLoading]=useState(true)
  const dispatch=useDispatch()

  useEffect(()=>{
     
    if (loading){
      RefreshToken(setLoading,loading,admin)

    }
    const fourminuts = (1000 * 60 *4) 
    const interval= setInterval(()=>{
      RefreshToken(setLoading,loading,admin)
    },fourminuts)

    return ()=>{
      clearInterval(interval)
    }
    },[loading,admin_data]) 

  useEffect(()=>{

    Get_data(admin_details_URLS,admin)

    if(!admin_data){
      navigate("/Admin")

    }else if (!admin_data.role){
        dispatch(addAdmin())
        navigate("/Admin")

    }

  },[])  

 
  
  return (
    <div>
        <div className=" flex justify-center py-6 shadow-xl">
        <Header_admin/>

        </div>
        <div className=''>
            <h1>User List</h1>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {user_data.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>
                                <button onClick={() => editUser(user.id)}>Edit</button>
                                <button onClick={() => deleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Admin_home