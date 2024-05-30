import axios from "axios"
import Cookies from "js-cookie"
import { Ref_token_URLS } from "../Redux/Constants"
import { toast } from "react-toastify"
import { jwtDecode } from "jwt-decode"
import { useDispatch } from "react-redux"
import { addUser } from "../Redux/SliceUser"
import { useNavigate } from "react-router-dom"


const useUpdateToken = () => {
    
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const RefreshToken= async (setLoading,loading)=>{
         
        const raw_token=Cookies.get('UserCookie')
        const ref_token=JSON.parse(raw_token)
        console.log(ref_token)
        if(!ref_token){
          return ;
        }
        try{
            const response = await axios.post(Ref_token_URLS,{refresh:ref_token.refresh},{
                headers:{
                    'Content-Type': 'application/json',
    
                }
            })
            if (response.status === 200){
                const token =JSON.stringify(response.data)
                Cookies.set("UserCookie",token,{expires:30})
                const details=jwtDecode(response.data.access)

                dispatch(addUser(details)) 
                if(loading){
                    setLoading(false)

                }
                
            }
        }catch(error){

            console.log(error,"somthing is wrong")

            navigate("login/")



        }
       


    }

    return {RefreshToken}

}

export default useUpdateToken