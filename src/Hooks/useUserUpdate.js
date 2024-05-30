import { toast } from "react-toastify";
import { user_update_URLS } from "../Redux/Constants";
import Cookies from "js-cookie"
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUserDetails } from "../Redux/SliceUser";

const useUserUpdate = () => {
    
    const dispatch=useDispatch()
    const userUpdate =async(username,email,phone,id)=>{
       
        const isUsername = /^[A-Za-z][A-Za-z\s-]*$/.test(username);
        const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
        const isPhone = /^(?!.*(\d)\1{9})\d{10}$/.test(phone);

        if (!isUsername){
            toast.warning("please enter valid username")
            return ;
        } 
        else if (!isEmail) {
            toast.warning("Please enter valid Email")
            return ;

        }else if (!isPhone){
            toast.warning("Please enter valid Phone number")
            return ;
        }

        try{
            const raw_token=Cookies.get('UserCookie')
            const token=JSON.parse(raw_token)
        
            const formData= new FormData();
            formData.append("username",username)
            formData.append("email",email)
            formData.append("phone",phone)
            formData.append("id",id)

            if (token){
                const response = await axios.patch(user_update_URLS,formData,{
                    header:{
                        'Authorization':`Bearer ${token.access}`,
                        "Content-Type": "application/json",
    
                    }
                })
                if (response.status===200){
                    console.log(response.data)
                    dispatch(addUserDetails(response.data))
                    toast.success('User details updated successfully');
                }
            }else{

                toast.warning("Something is wrong. Please log in again")
            }

            

        }catch(error){
         
            console.log(error)
        }
        




    };


    return {userUpdate}
     

}

export default useUserUpdate;