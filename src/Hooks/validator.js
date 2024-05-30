import { toast } from "react-toastify";
import { signup_URLS } from "../Utils/Constants";
import axios, { all } from "axios";
import { img_upload_URLS } from "../Redux/Constants";
import Cookies from "js-cookie"
import useGetUserdata from "./useGetUserdata";
import { useNavigate } from "react-router-dom";

const Signup_validator = (
  username,
  lastname,
  email,
  phone,
  password,
  con_password,
  navigate
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
          toast.success("Successfully account created");
          navigate("/login");
        } else if (response.status === 404) {
          toast.warning("Somthing is wrong");
        }
      } catch (error) {
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
                Get_data()
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

export { Image_validate };

export default Signup_validator;
