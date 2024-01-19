import { createSlice } from "@reduxjs/toolkit";

const getSenderId=()=>{
    let userId="";
    if (typeof window !== 'undefined') {
        userId=localStorage.getItem("todo-userId");
        console.log("local-userId",userId);
    }
    return userId?userId:""
}

export const chatDataSlice=createSlice({
    name:"chatData",
    initialState:{
        senderId:getSenderId(),
        receiverId:"6597e9ddc548f6c7e0d828a5",
        activeUsers:[]
    },
    reducers:{
       updateSender:(state,action)=>{
        state.senderId=action.payload
       },
       updateReceiver:(state,action)=>{
        state.receiverId=action.payload
       },
       setActiveUsers:(state,action)=>{
        state.activeUsers=action.payload
       }
    }
})

export const {updateReceiver,updateSender,setActiveUsers} = chatDataSlice.actions
export const selectSenderId=(state)=>state.chatData.senderId
export const selectReceiverId=(state)=>state.chatData.receiverId
export const selectActiveUsers=(state)=>state.chatData.activeUsers
export default chatDataSlice.reducer