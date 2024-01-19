"use client"
import Navbar from "@/components/Navbar/Navbar"
import "@/app/chat/chat.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectToken, selectUserId } from "@/redux/slices/userSlice";
import { useGetAllUsersQuery } from "@/redux/api/apiSlice";
import UserItem from "@/components/chatComponents/UserItem/UserItem";
import { socket } from "@/src/socket";

const ChatLayout=({ children})=>{
    const userId=useSelector(selectUserId);
    const token=useSelector(selectToken);
    const {data,error}=useGetAllUsersQuery({userId,token});
    
    return (
       
        <div className='Home'>
            <Navbar />
           <div className="chat-layout">
              <div className="all-convo">
                <div className="user-list">
                {data&&data.users.map(user=>(
                    <UserItem user={user} key={user._id}/>
                ))}
                </div>
              </div>
              <div className="convo-cont">
                {children}
              </div>
           </div>
        </div>
        
    )
}
export default ChatLayout