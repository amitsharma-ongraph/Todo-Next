"use client"

import "@/components/chatComponents/messages/Messages.css"
import { useEffect } from "react"
import { socket } from "@/src/socket"
import { useGetMessagesQuery } from "@/redux/api/apiSlice"
import { useSelector } from "react-redux"
import { selectActiveConvo, selectModId, selectSenderId} from "@/redux/slices/chatDataSlice"
import MessageItem from "@/components/chatComponents/messageItem/MessageItem"

export default function Messages() {
  const activeConvo=useSelector(selectActiveConvo);
  const messagesRes=useGetMessagesQuery({chatId:activeConvo._id});
  const modId=useSelector(selectModId);
  const senderId=useSelector(selectSenderId);

  useEffect(()=>{
    socket.on("receiveMessage",()=>{
      messagesRes.refetch();
    })
  },[])
  return (
    <div className="messages-cont">
      {messagesRes.data&&messagesRes.data.messages.map(message=>(
        <MessageItem message={message} modId={modId} senderId={senderId} key={message._id}/>
      ))
      }
      
    </div>
  )
}
