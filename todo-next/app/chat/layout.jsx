"use client"
import Navbar from "@/components/Navbar/Navbar"
import "@/app/chat/chat.css";
import { useEffect } from "react";
import io from "socket.io-client"

const EndPoint="http://localhost:5000"
let socket;
const ChatLayout=({ children})=>{
   useEffect(()=>{
    socket=io(EndPoint,()=>{
    });
    console.log("connected")
   },[EndPoint])
    return (
       
        <div className='Home'>
            <Navbar />
           <div className="chat-layout">
              <div className="all-convo"></div>
              <div className="convo-cont"></div>
           </div>
        </div>
        
    )
}
export default ChatLayout