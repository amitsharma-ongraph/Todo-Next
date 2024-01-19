"use client"

import { useGetAllUsersQuery } from "@/redux/api/apiSlice"
import { selectSenderId } from "@/redux/slices/chatDataSlice"
import { socket } from "@/src/socket"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import UserItem from "@/components/chatComponents/UserItem/UserItem"

function page() {
  useEffect(()=>{
    socket.on("activeUsers",(activeUsers)=>{
      console.log("active users changed",activeUsers)
  })
  },[])
  const userId=useSelector(selectSenderId);
  const convoData=useGetAllUsersQuery({userId})

  return (
    <div className="chat-screen">
        <div className="left-side-bar">
          <div className="host-details"></div>
          <div className="user-list">
          {convoData.data&&convoData.data.users.map(user=>(
                    <UserItem user={user} key={user._id}/>
                ))}
          </div>
        </div>
        <div className="chat-section">

        </div>
    </div>
  )
}

export default page
