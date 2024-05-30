import axios from 'axios'
import { toast } from "react-toastify"
import { useDispatch} from 'react-redux'
import { user_data_URLS } from '../Utils/Constants'
import Cookies from "js-cookie"
import { addUserDetails } from '../Redux/SliceUser'

const useGetUserdata = () => {

    const dispatch=useDispatch()
    const Get_data= async()=>{
        const raw_token=Cookies.get('UserCookie')
        const token=JSON.parse(raw_token)
        if (token){
            const response= await axios.get(user_data_URLS,{
                headers:{
                    'Authorization':`Bearer ${token.access}`,
                    'Content-Type' : 'application/json'
                }
            })

            if (response.status===200){
                
                console.log(response.data,"get method")
                dispatch(addUserDetails(response.data))

            }
        }
    
        }
   
    return {Get_data}
}

export default useGetUserdata