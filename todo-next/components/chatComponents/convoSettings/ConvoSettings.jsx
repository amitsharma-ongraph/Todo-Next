"use client"
import React, { useState } from 'react'
import "@/components/chatComponents/convoSettings/ConvoSetting.css"
import { selectActiveConvo } from '@/redux/slices/chatDataSlice';
import { useSelector } from 'react-redux';
import check from "@/public/images/check-circle.png"
import Image from 'next/image';
import store from '@/redux/store';
import { apiSlice } from '@/redux/api/apiSlice';
import { selcetUser } from '@/redux/slices/userSlice';
function ConvoSettings() {
  const [type,setType]=useState("add");
  const [searchValue,setSearchValue]=useState("");
  const [activeOptions,setActiveOptions]=useState([]);
  const activeConvo=useSelector(selectActiveConvo);
  const [removeOption,setRemoveOptions]=useState([]);
  const [removeSearch,setRemoveSearch]=useState("");
  const hostUser=useSelector(selcetUser);

  const getUsers=()=>{
    return activeConvo.users?.filter(user=>user.name.toLowerCase().includes(searchValue.toLowerCase())||user.email.toLowerCase().includes(searchValue.toLowerCase()))
  }

  const getGroupMembers=()=>{
    return activeConvo.users?.filter(user=>user._id!=activeConvo.groupAdmin&&(user.name.toLowerCase().includes(removeSearch.toLowerCase())||user.email.toLowerCase().includes(removeSearch.toLowerCase())))
  }

  const handleInputToggle=(id)=>{
    if(!activeOptions.includes(id)){
      setActiveOptions([...activeOptions,id])
    }
    else{
      setActiveOptions(activeOptions.filter(option=>option!=id))
    }
  }

  const handleRemoveToggle=(id)=>{
    if(!removeOption.includes(id)){
      setRemoveOptions([...removeOption,id])
    }
    else{
      setRemoveOptions(removeOption.filter(option=>option!=id))
    }
  }

  const getUsersString=()=>{
    let userNames=[];
    removeOption.forEach(option=>{
      userNames.push(option.name)
    })
  }
  const handleRemoveUser=async()=>{
    await store.dispatch(apiSlice.endpoints.removeGroupUser.initiate({users:removeOption,chatId:activeConvo._id,adminName:hostUser.name}))
  }

  return (
    <div className="convo-settings">
      <div className='setting-type'>
        <button className={`${type=="add"?"active":""}`} onClick={()=>{setType("add")}}>Add User</button>
        <button className={`${type=="remove"?"active":""}`} onClick={()=>{setType("remove")}}>Remove User</button>
      </div>
      {type=="add"&&
      <div className="add-user-cont">
        <div className="add-user-input-cont">
            <input type="text" className="add-user-input" value={searchValue} onChange={e=>{setSearchValue(e.target.value)}} placeholder="Search user"/>
            </div>
        <div className="user-options-cont">   
            {activeConvo.users&&<>
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
                    {activeOptions.includes(user._id)&&<Image src={check} height={24} width={24} alt="checked" />}
                  </div>
                </div>
               ))}
            </>}
        </div>
        <div className='setting-submit'>
          <button>Add</button>
        </div>
      </div> }
      {type=="remove"&&<div className='remove-user-cont'>
            <div className="add-user-input-cont">
            <input type="text" className="add-user-input" value={removeSearch} onChange={e=>{setRemoveSearch(e.target.value)}} placeholder="Search user"/>
            </div>
        <div className="user-options-cont">   
            {activeConvo.users&&<>
               {getGroupMembers().map(user=>(
                <div className="user-option" key={user._id} onClick={()=>{handleRemoveToggle(user._id)}}>
                  <div className="user-option-icon-cont">
                  <div className="user-option-icon">{user?user.name[0]:""}</div>
                  </div>
                  <div className="user-option-details">
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                  </div>
                  <div className="check-cont">
                    {removeOption.includes(user._id)&&<Image src={check} height={24} width={24} alt="checked" />}
                  </div>
                </div>
               ))}
            </>}
        </div>
        <div className='setting-submit' onClick={handleRemoveUser}>
          <button>Remove</button>
        </div>
      </div>}
    </div>
  )
}

export default ConvoSettings
