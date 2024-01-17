
import { createSlice } from "@reduxjs/toolkit";

const getLocalToken=()=>{
    let token ="";
    if (typeof window !== 'undefined') {
        token=localStorage.getItem("todo-token");
        console.log("local-token",token);
    }
 
    return token?token:"";
    
}
const getLocalUserId=()=>{
    let userId="";
    if (typeof window !== 'undefined') {
        userId=localStorage.getItem("todo-userId");
        console.log("local-userId",userId);
    }
    return userId?userId:""
}
const getLocalUser=()=>{
    let user={};
    if (typeof window !== 'undefined') {
     user=JSON.parse(localStorage.getItem("todo-user"));
     console.log("local-user",user)
    }
  
    return user;
}

export const userSlice = createSlice({
    name:'user',
    initialState:{
        token:getLocalToken(),
        userId:getLocalUserId(),
        user:getLocalUser()
    },
    reducers:{
        updateUserId:(state,action)=>{
              console.log("payload user Id",action.payload)
              state.userId=action.payload
        },
        updateToken:(state,action)=>{
            state.token=action.payload
        },
        updateUser:(state,action)=>{
            state.user=action.payload
        }
    }
})

export const {updateUserId,updateToken,updateUser}=userSlice.actions

export const selectUserId = state=>state.user.userId
export const selectToken =state=>state.user.token
export const selcetUser=state=>state.user.user
export default userSlice.reducer