import axios from "axios"
import { signin_URLS, user_data_URLS, user_exel_URLS } from "../Utils/Constants"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import {jwtDecode} from 'jwt-decode'
import {  addUser } from "../Redux/SliceUser"
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom"
import { addAdmin } from "../Redux/AdminSlice"

const useUserManage = () => {
  
    const dispatch=useDispatch()
    const navigate=useNavigate()
    
    const get_token = async (email,password,admin=false)=>{

        if(email && password){

                    const isEmail=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
                    const isPassword=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(password)
                    if (!isEmail) return "Please enter valid Email"
                    if (!isPassword) return "Please enter valid Password."
                
                
                const data={
                    email:email,
                    password:password
            
                }
                
                try{
                    const response = await axios.post(signin_URLS,data,{
                        headers:{
                            'Content-Type': 'application/json',
                        }
                    })
            
                    if (response.status===200){
                    
                    
                    if (!admin){
                        const token =JSON.stringify(response.data)
                        Cookies.set("UserCookie",token,{expires:30})
                        const details=jwtDecode(response.data.access)
                        
                        if(details.role){
                            toast.warning("SuperUser not Allowed .only for Users")

                        } else{
                            dispatch(addUser(details))    
                            navigate("/")
                            toast.success("Sign in in successfully ")
                        }
                       
                    }else{
                        const token =JSON.stringify(response.data)
                        Cookies.set("AdminCookie",token,{expires:30})
                        const details=jwtDecode(response.data.access)
                        console.log(details,"token")
                        if (details.role){
                            dispatch(addAdmin(details))    
                            navigate("/Admin_home")
                            toast.success("Sign in in successfully ")
                        }else{
                            toast.warning("User not Superuser.only superuser access ")

                        } 
                    }
                    } 
                }catch(error){
                    console.log(error.data)
                    console.error('Response Status:', error.response.status);
                    console.error('Response Data:', error.response.data.detail);
                    toast.warning(error.response.data.detail)
                }
            }else{

                return "Please Enter valid credentials"
            
            
               }    
                
            
            }

    const UserExelData = async(data)=>{

        try{
          const response = await axios.post(user_exel_URLS,data,{
            responseType: 'blob',  // This is crucial for binary data
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            }
        })
          if(response.status === 200){
            const blob = new Blob([response.data], { 
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });
            
            // Create and trigger download
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `user_details_${new Date().toISOString().slice(0,10)}.xlsx`;
            document.body.appendChild(a);
            a.click();
            
            // Cleanup
            window.URL.revokeObjectURL(url);
            a.remove();
          }
        }catch(error){
            console.log(error,'user exel data error')
        }
    }

    return{ get_token,UserExelData};
   
}

export default useUserManage