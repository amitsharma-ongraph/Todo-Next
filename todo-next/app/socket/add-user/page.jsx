"use client"
import "@/app/socket/add-user/AddUser.css"
import { apiSlice, useGetAllUsersQuery } from "@/redux/api/apiSlice"
import { selectSenderId } from "@/redux/slices/chatDataSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import check from "@/public/images/check-circle.png"
import store from "@/redux/store";
import { socket } from "@/src/socket";
import { useRouter } from "next/navigation";

function AddUser() {
  const senderId=useSelector(selectSenderId);
  const users=useGetAllUsersQuery({userId:senderId});
  const [searchKey,setSearchKey]=useState("")
  const [userOptions,setUserOptions]=useState([]);
  const [activeOption,setActiveOption]=useState("");
  const router=useRouter();
  const dispatch=useDispatch();

  useEffect(()=>{
    if(users.data){
      setUserOptions(users.data.users)
    }
  },[users])

  const getUsers=()=>{
    return userOptions.filter(user=>user.name.toLowerCase().includes(searchKey.toLowerCase())||user.email.toLowerCase().includes(searchKey.toLowerCase()))
    
  }

  const handleAddUser=async()=>{
    const addRes=await store.dispatch(apiSlice.endpoints.addUserConvo.initiate({users:[senderId,activeOption]})).then((addRes)=>{
      if(addRes.data?.success==true){
        socket.emit('sendMessage');
        dispatch(setActiveOption(addRes.data.chat))
        router.push("/socket")
      }
    }).catch(e=>{

    });
  }
  return (
    <div className="add-user-page">
      <h1>Start a new conversation</h1>
      <div className="add-user-cont">
        <div className="add-user-input-cont">
            <input type="text" className="add-user-input" value={searchKey} onChange={e=>{setSearchKey(e.target.value)}} placeholder="Search user"/>
            <button disabled={activeOption==""?true:false} className="add-user-button" onClick={handleAddUser}>Add</button>
        </div>
        <div className="user-options-cont">
            {users.data&&<>
               {getUsers().map(user=>(
                <div className="user-option" key={user._id} onClick={()=>{setActiveOption(user._id)}}>
                  <div className="user-option-icon-cont">
                  <div className="user-option-icon">{user?user.name[0]:""}</div>
                  </div>
                  <div className="user-option-details">
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                  </div>
                  <div className="check-cont">
                    {user._id==activeOption&&<Image src={check} height={24} width={24} alt="checked" />}
                  </div>
                </div>
               ))}
            </>}
        </div>
      </div>
    </div>
  )
}

export default AddUser
