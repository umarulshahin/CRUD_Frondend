import { createSlice } from "@reduxjs/toolkit";


const AdminSlice=createSlice({

    name:"Admin_data",
    initialState:{
        admin:'',
        admin_details:{}
    },
    reducers:{
      
        addAdmin:(state,action)=>{
            state.admin=action.payload
        },
        addAdmindetails:(state,action)=>{
            state.admin_details=action.payload
        }

    }
});

export const {addAdmin,addAdmindetails} = AdminSlice.actions;


export default AdminSlice.reducer;

