import axios from "axios";
import Cookies from "js-cookie";
import { Ref_token_URLS } from "../Redux/Constants";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { addUser } from "../Redux/SliceUser";
import { useNavigate } from "react-router-dom";
import { addAdmin } from "../Redux/AdminSlice";

const useUpdateToken = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const RefreshToken = async (setLoading, loading,admin=false) => {
    let ref_token 
    let raw_token
    if(!admin){
         raw_token=Cookies.get('UserCookie')
         ref_token=JSON.parse(raw_token)

    }else{

        raw_token=Cookies.get('AdminCookie')
        ref_token=JSON.parse(raw_token)
    }
     
    if (!ref_token) {
      return;
    }
    try {

      const response = await axios.post(
        Ref_token_URLS,
        { refresh: ref_token.refresh },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const token = JSON.stringify(response.data);
        const details = jwtDecode(response.data.access);


        if (!admin){

            Cookies.set("UserCookie", token, { expires: 30 });
            dispatch(addUser(details));   

        }else{
            Cookies.set("AdminCookie",token,{expires:30})
            dispatch(addAdmin(details)) 
            
        }
        
        if (loading) {
          setLoading(false);
        }
      }

    } catch (error) {

        if (loading) {
            setLoading(false);
          }
      console.log(error, "somthing is wrong");
      if(admin){
        navigate("/Admin")
        dispatch(addAdmin())
      }else{
        navigate("login/")
        dispatch(addUser())
      }
    

     
    }
  };

  return { RefreshToken };
};

export default useUpdateToken;
