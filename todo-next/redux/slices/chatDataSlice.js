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
        activeConvo:{},
        activeUsers:[],
        modId:"65b0b29602b7aefdaa2ccac8",
        callActive:true
    },
    reducers:{
       updateSender:(state,action)=>{
        state.senderId=action.payload
       },
       updateActiveConvo:(state,action)=>{
        console.log("updating acive convo",action.payload)
        state.activeConvo=action.payload
       },
       setActiveUsers:(state,action)=>{
        state.activeUsers=action.payload
       },
       setCallActive:(state,action)=>{
        state.callActive=action.payload
       }
    }
})

export const {updateActiveConvo,updateSender,setActiveUsers,setCallActive} = chatDataSlice.actions
export const selectSenderId=(state)=>state.chatData.senderId
export const selectActiveConvo=(state)=>state.chatData.activeConvo
export const selectActiveUsers=(state)=>state.chatData.activeUsers
export const selectModId=(state)=>state.chatData.modId
export const selectCallActive=(state)=>state.chatData.callActive
export default chatDataSlice.reducer