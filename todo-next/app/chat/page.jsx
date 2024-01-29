"use client";
import "@/app/chat/chatPage.css";

import {
  selectActiveConvo,
  selectActiveUsers,
  selectSenderId,
  updateActiveConvo,
} from "@/redux/slices/chatDataSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import multipleUser from "@/public/images/users.png";
import sendIcon from "@/public/images/send (2).png";
import Messages from "@/components/chatComponents/messages/Messages";
import { socket } from "@/src/socket";
import store from "@/redux/store";
import { apiSlice } from "@/redux/api/apiSlice";
import ConvoSettings from "@/components/chatComponents/convoSettings/ConvoSettings";
import settingIcon from "@/public/images/settings.png";
import leaveIcon from "@/public/images/remove-user.png"
import { selcetUser } from "@/redux/slices/userSlice";

function page() {
  const activeConvo = useSelector(selectActiveConvo);
  const senderId = useSelector(selectSenderId);
  const activeUsers = useSelector(selectActiveUsers);
  const dispatch=useDispatch();
  const hostUser=useSelector(selcetUser);

  console.log(hostUser)
  const [message, setMessage] = useState("");
  const [settingMode, setSettingMode] = useState(false);
  const isActive = () => {
    return activeConvo.users?.some((user) => {
      if (user._id != senderId && activeUsers.includes(user._id)) {
        return true;
      } else {
        return false;
      }
    });
  };
  useEffect(() => {
    setMessage("");
    setSettingMode(false)
  }, [activeConvo]);

  const handleSendMessage = async () => {
    let seenBy = [senderId];
    const res = await store.dispatch(
      apiSlice.endpoints.sendMessage.initiate({
        senderId,
        chatId: activeConvo._id,
        seenBy,
        content: message,
      })
    );
    console.log(res.data);
    socket.emit("sendMessage");
    setMessage("");
  };

  const handleEndChat=async()=>{
    const res=await store.dispatch(apiSlice.endpoints.endConvo.initiate({userId:senderId,chatId:activeConvo._id,isGroupChat:activeConvo.isGroupChat,userName:hostUser.name}));
    if(res.data?.success==true){
      setSettingMode(false)
      dispatch(updateActiveConvo({}))
      socket.emit("newConvo");
    }
  }

  return (
    <>
      {activeConvo.chatName && (
        <div className="conversation">
          <div className="convo-details">
            <div className="convo-name-details">
              <div className="convo-avatar">
                {!activeConvo.isGroupChat && activeConvo.chatName
                  ? activeConvo.chatName[0]
                  : ""}
                {activeConvo.isGroupChat && (
                  <Image src={multipleUser} alt="G" height={24} width={24} />
                )}
              </div>
              <div className="convo-name">
                <p>{activeConvo.chatName}</p>
                {activeConvo.isGroupChat && (
                  <p className="participants">
                    {activeConvo.users.length} Participants
                  </p>
                )}
                {!activeConvo.isGroupChat && isActive() && (
                  <div className="online-cont">
                    <div className="online-icon"></div>
                    <div>Active Now</div>
                  </div>
                )}
              </div>
            </div>
            <div>
                {activeConvo.groupAdmin==senderId&&<button
                  className="setting-btn"
                  onClick={() => {
                    setSettingMode(!settingMode);
                  }}
                >
                  <Image src={settingIcon} height={24} width={24} />
                </button>}
               {activeConvo.groupAdmin!=senderId&&<>
                <button
                  className="setting-btn"
                  onClick={() => {
                    setSettingMode(!settingMode);
                  }}
                >
                  <Image src={leaveIcon} height={32} width={32} />
                </button>
               </>}
            </div>
          </div>
          <div className="messages">
            <Messages />
            {settingMode &&(
              <div className="convo-setting-cont">
                {activeConvo.groupAdmin==senderId&&<ConvoSettings />}
                {activeConvo.groupAdmin!=senderId&&<>
                {activeConvo.isGroupChat==true&&<div className="leave">
                  <h1>Sure to Leave the group ?</h1>
                  <div>
                    <button onClick={()=>{setSettingMode(false)}}>cancle</button>
                    <button onClick={handleEndChat}>leave</button>
                  </div>
                </div>}
                {activeConvo.isGroupChat==false&&<div className="leave">
                  <h1>Sure to end conversation ?</h1>
                  <div>
                    <button onClick={()=>{setSettingMode(false)}}>cancle</button>
                    <button onClick={handleEndChat}>remove</button>
                  </div>
                </div>}
                </>}
              </div>
            )}
          </div>

          <div
            className="controlls"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <form action="" className="msg-form">
              <input
                type="text"
                className="msg-input"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></input>
            </form>
            <button onClick={handleSendMessage}>
              <Image src={sendIcon} height={24} width={24} alt="send" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default page;
