"use client"

import "@/app/socket/create-group/CreateGroup.css"
import { apiSlice, useGetAllUsersQuery } from "@/redux/api/apiSlice"
import { selectSenderId } from "@/redux/slices/chatDataSlice";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import check from "@/public/images/check-circle.png"
import store from "@/redux/store";
import { socket } from "@/src/socket";
import { useRouter } from "next/navigation";

function CreateGroup() {
  const senderId=useSelector(selectSenderId);
  const users=useGetAllUsersQuery({userId:senderId});
  const [searchKey,setSearchKey]=useState("")
  const [userOptions,setUserOptions]=useState([]);
  const [activeOption,setActiveOption]=useState([]);
  const [groupName,setGroupName]=useState("")
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

  const handleInputToggle=(id)=>{
    if(!activeOption.includes(id)){
      setActiveOption([...activeOption,id])
    }
    else{
      setActiveOption(activeOption.filter(option=>option!=id))
    }
  }
  const handleCreateGroup=async ()=>{
    await store.dispatch(apiSlice.endpoints.createGroup.initiate({chatName:groupName,users:[...activeOption,senderId],groupAdmin:senderId})).then(res=>{
      socket.emit("sendMessage");
      router.push("/socket/")
    }).catch(e=>{
      console.log(e)
    })
  }
  return (
    <div className="create-group-page">
      <h1>Create a new group</h1>
      <div className="add-user-cont">
        <div className="group-name-input-container">
        <input type="text" className="add-user-input" value={groupName} onChange={e=>{setGroupName(e.target.value)}} placeholder="Enter the group name"/>
        </div>
        <div className="add-user-input-cont">
            <input type="text" className="add-user-input" value={searchKey} onChange={e=>{setSearchKey(e.target.value)}} placeholder="Search user"/>
        </div>
        <div className="user-options-cont">
            {users.data&&<>
               {getUsers().map(user=>(
                <div className="user-option" key={user._id} onClick={()=>{handleInputToggle(user._id)}}>
                  <div className="user-option-icon-cont">
                  <div className="user-option-icon">{user?user.name[0]:""}</div>
                  </div>
                  <div className="user-option-details">
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                  </div>
                  <div className="check-cont">
                    {activeOption.includes(user._id)&&<Image src={check} height={24} width={24} alt="checked" />}
                  </div>
                </div>
               ))}
            </>}
        </div>
        <div className="btn-container">
          <button disabled={activeOption.length<2||groupName==""?true:false} className="add-user-button" onClick={handleCreateGroup}>Add</button>
        </div>
      </div>
    </div>
  )
}

export default CreateGroup
