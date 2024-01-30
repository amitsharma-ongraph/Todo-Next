"use client";
import Navbar from "@/components/Navbar/Navbar";
import "@/app/chat/chatLayout.css";
import { socket } from "@/src/socket";
import { useDispatch, useSelector } from "react-redux";
import { selectCallActive, selectSenderId, setActiveUsers } from "@/redux/slices/chatDataSlice";
import { useEffect } from "react";
import { useGetAllConvoQuery, useGetAllUsersQuery } from "@/redux/api/apiSlice";
import ConvoItem from "@/components/chatComponents/UserItem/ConvoItem";
import { selcetUser } from "@/redux/slices/userSlice";
import Image from "next/image";
import singleUser from "@/public/images/singleUser.png";
import multipleUser from "@/public/images/users.png";
import { usePathname, useRouter } from "next/navigation";
import chatScreen from "@/public/images/chat-screen.png"
import CallComponent from "@/components/chatComponents/calllComponent/CallComponent"

function layout({ children }) {
  const router = useRouter();
  const pathName = usePathname();
  const hostUserId = useSelector(selectSenderId);
  const hostUser = useSelector(selcetUser);
  const isCallActive=useSelector(selectCallActive);

  const dispatch = useDispatch();
  const userId = useSelector(selectSenderId);
  const convoData = useGetAllConvoQuery({ userId });

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("setOnline", { userId: hostUserId, socketId: socket.id });
    });
    socket.on("disconnect", () => {
      socket.emit("setOffline", { userId: hostUserId, socketId: socket.id });
    });
    socket.on("activeUsers", (activeUsers) => {
      dispatch(setActiveUsers(activeUsers));
    });
    socket.on("receiveMessage",()=>{
      convoData.refetch();
    })
    socket.on("onNewConvo",()=>{
      convoData.refetch();
    })
    socket.on("onSetSeen",()=>{
      convoData.refetch();
    })
  }, []);

  return (
    <>
      <Navbar />
      <div className="chat-app-layout">
        {isCallActive&&<CallComponent/>}
        <div className="chat-screen">
          <div className="left-side-bar">
            <div className="host-details">
              <div className="host-data">
                <div className="convo-logo-cont">
                  <div className="convo-logo">
                    {hostUser.name[0].toLowerCase()}
                  </div>
                </div>
                <div className="host-name">
                  <div>
                    <p>{hostUser.name}</p>
                    <p>{hostUser.email}</p>
                  </div>
                </div>
              </div>
              <div className="host-options">
                <div 
                   className={`host-option open-chat ${
                    pathName == "/chat" ? "active-option" : ""
                  }`}
                  onClick={()=>{router.push("/chat")}}
                >
                    <Image src={chatScreen} height={16} width={16} alt="chat"/>
                </div>
                <div
                  className={`host-option ${
                    pathName == "/chat/add-user" ? "active-option" : ""
                  }`}
                  onClick={()=>{router.push("/chat/add-user")}}
                >
                  <div className="option-logo">
                    <Image src={singleUser} height={16} width={16} alt="+"/>
                  </div>
                  <p>Add User</p>
                </div>

                <div 
                  className={`host-option ${
                    pathName == "/chat/create-group" ? "active-option" : ""
                  }`}
                  onClick={()=>{router.push("/chat/create-group")}} 
                >
                  <div className="option-logo">
                    <Image src={multipleUser} height={16} width={16} alt="+"/>
                  </div>
                  <p>Create Group</p>
                </div>
              </div>
            </div>
            <div className="user-list">
              {convoData.data &&
                convoData.data.conversations.map((convo) => (
                  <ConvoItem convo={convo} key={convo._id} />
                ))}
            </div>
          </div>
          <div className="main-section">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default layout;
