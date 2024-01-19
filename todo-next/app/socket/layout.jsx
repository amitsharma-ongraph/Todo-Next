"use client"
import Navbar from "@/components/Navbar/Navbar"
import "@/app/socket/socket.css"
import { socket } from "@/src/socket"
import { useSelector } from "react-redux";
import { selectSenderId } from "@/redux/slices/chatDataSlice";
import { useEffect } from "react";

function layout({children}) {
  const hostUserId=useSelector(selectSenderId);
 
  useEffect(()=>{
    socket.connect();
   
    return ()=>{
        socket.disconnect();
    }
  },[])

  useEffect(()=>{
    socket.on("connect",()=>{
        socket.emit("setOnline",{userId:hostUserId,socketId:socket.id});
    })
    socket.on("disconnect",()=>{
        socket.emit("setOffline",{userId:hostUserId,socketId:socket.id})
    })
  },[])

  return (
    <>
      <Navbar />
      <div className="chat-app-layout">
        {children}
      </div>
    </>
  )
} 

export default layout
