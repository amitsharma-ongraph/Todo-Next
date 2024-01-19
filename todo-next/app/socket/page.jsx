"use client"

import { useGetAllUsersQuery } from "@/redux/api/apiSlice"
import { selectActiveUsers, selectSenderId, setActiveUsers } from "@/redux/slices/chatDataSlice"
import { socket } from "@/src/socket"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import UserItem from "@/components/chatComponents/UserItem/UserItem"

function page() {
  const dispatch=useDispatch()
  useEffect(()=>{
    socket.on("activeUsers",(activeUsers)=>{
      dispatch(setActiveUsers(activeUsers))
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
