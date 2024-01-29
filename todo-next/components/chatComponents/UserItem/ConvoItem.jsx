import "@/components/chatComponents/UserItem/ConvoItem.css";
import {
  selectActiveConvo,
  selectActiveUsers,
  selectSenderId,
  updateActiveConvo,
} from "@/redux/slices/chatDataSlice";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import multipleUsers from "@/public/images/users.png";
import { useEffect } from "react";
import store from "@/redux/store";
import { apiSlice } from "@/redux/api/apiSlice";
import { socket } from "@/src/socket";

function ConvoItem({ convo }) {
  const activeConvo = useSelector(selectActiveConvo);
  const activeUsers = useSelector(selectActiveUsers);
  const senderId=useSelector(selectSenderId);

  const initial=convo.chatName?convo.chatName[0]:"u"

  useEffect(()=>{
     socket.on("receiveMessage",()=>{
      console.log("message received on user item");
      handleSetSeen();
     })
  },[])

  const isSeen=()=>{
    return convo.latestMessage.seenBy.includes(senderId);
  }

  const handleSetSeen=async ()=>{
    if(activeConvo._id==convo._id&&isSeen()==false){
      store.dispatch(apiSlice.endpoints.setSeen.initiate({senderId,messageId:convo.latestMessage._id}));
    }
    socket.emit("setSeen");
  }

 console.log('isSeen',isSeen())
  const isActive = () => {
  
     return convo.users.some(user=>{
      if(user._id!=senderId&&activeUsers.includes(user._id)){
        return true;
      }
      else{
        return false;
      }
     })
  }
  const dispatch = useDispatch();
  const handleConvoSwitch = () => {
    dispatch(updateActiveConvo(convo));
  };
  return (
    <div
      className={`user-item ${
        convo._id == activeConvo._id ? "active-convo" : ""
      } ${isActive() == true ? "online" : ""}`}
      onClick={()=>{handleConvoSwitch();handleSetSeen()}}
    >
      <div className="flex align-center justify-center convo-log-cont">
        <div className="convo-logo">
          {!convo.isGroupChat && initial.toLowerCase()}
          {convo.isGroupChat && (
            <Image src={multipleUsers} height={16} width={16} alt="G"/>
          )}
        </div>
      </div>
      <div className="convo-data">
        <div className="user-name">{convo.chatName}</div>
        <div className={`last-msg ${!isSeen()?"not-seen":""}`}>{convo.latestMessage.content.substr(0,25)}</div>
      </div>
      <div className="pending">
         {!isSeen()&&<div className="pending-icon"></div>}
      </div>
    </div>
  );
}

export default ConvoItem;
