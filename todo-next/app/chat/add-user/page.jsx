"use client"
import "@/app/chat/add-user/AddUser.css"
import { apiSlice, useGetUserOptionQuery } from "@/redux/api/apiSlice"
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
  const usersRes=useGetUserOptionQuery({userId:senderId});
  const [searchName,setSearchName]=useState("")
  const [userOption,setUserOption]=useState([]);
  const [activeOption,setActiveOption]=useState("");
  const router=useRouter();
  const dispatch=useDispatch();

  useEffect(()=>{
    if(usersRes.data){
      setUserOption(usersRes.data.options)
    }
  },[usersRes])

  const getUsers=()=>{
    return userOption.filter(user=>user.name.toLowerCase().includes(searchName.toLowerCase())||user.email.toLowerCase().includes(searchName.toLowerCase()))
    
  }

  const handleAddUser=async()=>{
    const addRes=await store.dispatch(apiSlice.endpoints.addUserConvo.initiate({users:[senderId,activeOption]})).then((addRes)=>{
      if(addRes.data?.success==true){
        socket.emit('newConvo');
        router.push("/chat")
      }
    }).catch(e=>{
       console.log(e)
    });
  }
  return (
    <div className="add-user-page">
      <h1>Start a new conversation</h1>
      <div className="add-user-cont">
        <div className="add-user-input-cont">
            <input type="text" className="add-user-input" value={searchName} onChange={e=>{setSearchName(e.target.value)}} placeholder="Search user"/>
            <button disabled={activeOption==""?true:false} className="add-user-button" onClick={handleAddUser}>Add</button>
        </div>
        <div className="user-options-cont">
            {usersRes.data&&<>
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
