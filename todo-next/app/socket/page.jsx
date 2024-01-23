"use client"
import "@/app/socket/chatPage.css"

import { selectActiveConvo, selectActiveUsers, selectSenderId } from "@/redux/slices/chatDataSlice"
import Image from "next/image"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import multipleUser from "@/public/images/users.png"

function page() {
  const activeConvo=useSelector(selectActiveConvo)
  const senderId=useSelector(selectSenderId);
  const activeUsers=useSelector(selectActiveUsers);

  const isActive=()=>{
    return activeConvo.users?.some(user=>{
      if(user._id!=senderId&&activeUsers.includes(user._id)){
        return true;
      }
      else{
        return false;
      }
     })
  }
  useEffect(()=>{
    
  },[])
  
  console.log("convo results--",activeConvo)
  return (
        <>
        {activeConvo.chatName&&
          <div className="conversation">
              <div className="convo-details">
                <div className="convo-name-details">
                   <div className="convo-avatar">
                     {!activeConvo.isGroupChat&&activeConvo.chatName?activeConvo.chatName[0]:""}
                     {activeConvo.isGroupChat&&<Image src={multipleUser} alt="G" height={24} width={24}/>}
                   </div>
                   <div className="convo-name">
                     <p>{activeConvo.chatName}</p>
                     {activeConvo.isGroupChat&&<p className="participants">{activeConvo.users.length} Participants</p>}
                     {!activeConvo.isGroupChat&&isActive()&&<div className="online-cont"><div className="online-icon"></div><div>Active Now</div></div>}
                   </div>
                </div>
                <div>

                </div>
              </div>
              <div className="messages"></div>
              <div className="controlls">
                <form action="">
                  <input type="text"></input>
                </form>
                <button></button>
              </div>
          </div>
        }
        </>
  )
}

export default page
