"use client"
import { useEffect, useState } from "react"
import "@/app/chat/chat.css"
import { useDispatch, useSelector } from "react-redux"
import { selectReceiverId, selectSenderId } from "@/redux/slices/chatDataSlice"
import { useGetFriendUserQuery, useGetMessagesQuery} from "@/redux/api/apiSlice"
import Image from "next/image"
import sendIcon from "@/public/images/send (1).png"
import { apiSlice } from "@/redux/api/apiSlice"
import store from "@/redux/store"
import {socket,EndPoint} from "@/src/socket"
// import io from "socket.io-client";

// const EndPoint="http://localhost:5000" 
// let socket;
function page() {
  const hostUserId=useSelector(selectSenderId);
  const friendUserId=useSelector(selectReceiverId);
  const dispatch=useDispatch();
  const [message,setMessage]=useState("")
  const friendUserRes=useGetFriendUserQuery({friendUserId});
  
  const msgRes=useGetMessagesQuery({hostUserId,friendUserId});

  // useEffect(()=>{   
  //   socket.on('message', () => {
  //     console.log("client triggered");
  //     msgRes.refetch();
  //   });
  //   socket.emit("setOnline",hostUserId);
  //   socket.on("disconnect",()=>{ 
  //     socket.emit("setOffline",hostUserId);  
  //   }) 
  //   socket.on("activeUsers",(users)=>{
  //     console.log("another connected")
  //   }) 
  // },[EndPoint]) 

  const handleSendMessage=async()=>{
    let res=await store.dispatch(apiSlice.endpoints.sendMessage.initiate({hostUserId,friendUserId,content:message}))
    socket.emit("sendMessage");
    setMessage("")  
  }
  return (
    <>
     <div className="receiver-details">
      <div className="receiver-logo-cont">
        <div className="receiver-logo">{friendUserRes.data?.user.name[0].toUpperCase()}</div>
        <div className="receiver-name">
          <p>{friendUserRes.data?.user.name}</p>
          <p>{friendUserRes.data?.user.email}</p>
        </div>
      </div>
     </div>
     <div className="chat-flow">
       {msgRes.data&&<>
           {msgRes.data.messages.map((msg)=>{
            
              return (
                <p id={msg._id} className={`message-item ${msg.senderId==friendUserId?"item-left":"item-right"}`} key={msg._id}>{msg.content}</p>
              )
           })}
       </>}
     </div>
     <form className="chat-controlls" onSubmit={e=>{e.preventDefault();handleSendMessage()}}>
       <input type="text" className="message-input" placeholder="Enter your message" value={message} onChange={e=>{setMessage(e.target.value)}}/>
       <button type="submit" className="send-btn">
       <Image src={sendIcon} alt="send" onClick={handleSendMessage} />
       </button>
     </form>
    </>
  )
}

export default page
