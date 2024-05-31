import axios from 'axios'
import { toast } from "react-toastify"
import { useDispatch} from 'react-redux'
import { user_data_URLS } from '../Utils/Constants'
import Cookies from "js-cookie"
import { addUserDetails } from '../Redux/SliceUser'
import { addAdmindetails } from '../Redux/AdminSlice'

const useGetUserdata = () => {

    const dispatch=useDispatch()
    const Get_data= async(Urls,admin=false)=>{
        
        let token 
        let raw_token
        if(!admin){
             raw_token=Cookies.get('UserCookie')
             token=JSON.parse(raw_token)
        }else{
            raw_token=Cookies.get('AdminCookie')
            token=JSON.parse(raw_token)
        }
      
        if (token){

            try{
                const response= await axios.get(Urls,{
                    headers:{
                        'Authorization':`Bearer ${token.access}`,
                        'Content-Type' : 'application/json'
                    }
                })
    
                if (response.status===200){
                    
                    if (admin){
                            console.log(response.data,"admin side")  
                            dispatch(addAdmindetails(response.data))
                    }else{
                        console.log(response.data[0],"get method")
                        dispatch(addUserDetails(response.data[0]))
                    }
                   
    
                }
            }catch(error){

                console.log(error)
                
            }
            
        }
    
        }
   
    return {Get_data}
}

export default useGetUserdata