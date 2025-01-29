import { toast } from "react-toastify";
import { signup_URLS, user_data_URLS } from "../Utils/Constants";
import axios from "axios";
import { admin_details_URLS, img_upload_URLS, user_delete_URLS } from "../Redux/Constants";
import Cookies from "js-cookie"
import useGetUserdata from "./useGetUserdata";
import { useNavigate } from "react-router-dom";

// /Sign up validation and user creation/

const Signup_validator = (
  username,
  lastname,
  email,
  phone,
  password,
  con_password,
  navigate,
  admin=false
) => {

  if (username && lastname && email && phone && password && con_password) {
    const isUsername = /^[A-Za-z][A-Za-z\s-]*$/.test(username);
    const isLastname = /^[A-Za-z][A-Za-z\s-]*$/.test(lastname);
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      email
    );
    const isPhone = /^(?!.*(\d)\1{9})\d{10}$/.test(phone);
    const isPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        password
      );
    const isCon_Password =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        con_password
      );

    if (!isUsername) return "please enter valid username";
    if (!isLastname) return "please enter valid last name";
    if (!isEmail) return "Please enter valid Email";
    if (!isPhone) return "Please enter valid Phone number";
    if (!isPassword)
      return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    if (!isCon_Password)
      return "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
    if (password != con_password) return "Passwords do not match.";

    const signup_data = async () => {
      const data = {
        username: username,
        lastname: lastname,
        email: email,
        phone: phone,
        password: password,
        con_password: con_password,
      };
      try {
        const response = await axios.post(
          signup_URLS,
          { data: data },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {

          if (response.data.error){
            console.log(response.data.error.non_field_errors[0])
            toast.warning(response.data.error.non_field_errors[0]);
            return;
          }
          else if(admin){
            console.log(response.data)
            navigate(admin_details_URLS,admin)
            toast.success("Successfully account created");

          }else{
            navigate("/login");
            toast.success("Successfully account created");
          }

        } else if (response.status === 404) {
          toast.warning("Somthing is wrong");
        }
      } catch (error) {
        console.log(error,'error in signup')
        if (error.response) {
          console.error("Response Status:", error.response.status);
          console.error("Response Data:", error.response.data);
          toast.warning("Somthing is wrong", error.response.status);
        }
      }
    };
    signup_data();
  } else {
    return "Please Enter valid credentials";
  }
};

// / image uploading /

const Image_validate = () => {

  const {Get_data}=useGetUserdata()
  const navigate=useNavigate()

  const img_validate = async (file) => {
    if (file){
        const raw_token=Cookies.get('UserCookie')
        const token=JSON.parse(raw_token)
        const formData = new FormData();
        formData.append('image', file);
        try{
            const response = await axios.patch(img_upload_URLS,formData,{
                headers:{
                    'Authorization':`Bearer ${token.access}`,
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (response.status===200){

                console.log(response.data)
                Get_data(user_data_URLS)
                navigate("/")
                toast.success("Image Update succesfully")
            }
        }catch(error){
            console.log(error)
            toast.warning(error)
        }
    }

  };

  return { img_validate };
};

const useUser_delete=()=>{
   const {Get_data}=useGetUserdata()    

  const user_delete  = async (id)=>{

    const raw_token=Cookies.get('AdminCookie')
    const ref_token=JSON.parse(raw_token)
   
    if (!ref_token){
      return ;
    }
    try{

      const response= await axios.delete(user_delete_URLS,{
        headers:{
          "Content-Type": "application/json",
          'Authorization':`Bearer ${ref_token.access}`,
  
        },
        data: { id } 
      })
      if (response.status===200){
        
        toast.success("User Deleted ")
        Get_data(admin_details_URLS,true)

      }
    }catch(error){
        
      console.log(error)
    }
   
  }

  return {user_delete}
}

export { Image_validate,useUser_delete };
     

export default Signup_validator;
