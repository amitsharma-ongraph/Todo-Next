import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name:'userId',
    initialState:{
        name:"",
        email:"",
        token:""
    },
    reducers:{
        updateUser:(state,action)=>{
              
        }
    }
})

export const {updateUser}=userSlice.actions

export default userSlice.reducer