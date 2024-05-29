import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User_data",
  initialState: {
    user: '', 
    user_details:{}
  },
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload; 
    },
    addUserDetails:(state,action)=>{
      state.user_details=action.payload
    }
  },

});

export const { addUserDetails,addUser} = UserSlice.actions;
export default UserSlice.reducer;
