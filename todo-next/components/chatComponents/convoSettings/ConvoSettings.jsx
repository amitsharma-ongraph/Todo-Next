"use client"
import React, { useState } from 'react'
import "@/components/chatComponents/convoSettings/ConvoSetting.css"
import { selectActiveConvo } from '@/redux/slices/chatDataSlice';
import { useSelector } from 'react-redux';
import addUser from "@/public/images/add-user.png"
import removeUser from "@/public/images/remove-user (1).png"
import Image from 'next/image';
import store from '@/redux/store';
import { apiSlice, useGetGroupMembersQuery, useGetGroupOptionQuery } from '@/redux/api/apiSlice';
import { selcetUser } from '@/redux/slices/userSlice';
import { socket } from '@/src/socket';

function ConvoSettings({setSettingMode}) {
  const [type,setType]=useState("add");
  const [searchValue,setSearchValue]=useState("");
  const activeConvo=useSelector(selectActiveConvo);
  const [removeSearch,setRemoveSearch]=useState("");
  const hostUser=useSelector(selcetUser);

  const groupOptions=useGetGroupOptionQuery({chatId:activeConvo._id});
  const groupMembers=useGetGroupMembersQuery({chatId:activeConvo._id})

  const getGroupMembers=()=>{
    return groupMembers.data?.users?.filter(user=>user._id!=activeConvo.groupAdmin&&(user.name.toLowerCase().includes(removeSearch.toLowerCase())||user.email.toLowerCase().includes(removeSearch.toLowerCase())))
  }

  const getGroupOptions=()=>{
    return groupOptions.data?.options.filter(option=>option.name.toLowerCase().includes(searchValue.toLowerCase())||option.email.toLowerCase().includes(searchValue.toLowerCase()))
  }
  const handleRemoveUser=async(userId,userName)=>{
    await store.dispatch(apiSlice.endpoints.removeGroupUser.initiate({userId,userName,chatId:activeConvo._id})).then(res=>{
      if(res.data.success){
        groupMembers.refetch();
        groupOptions.refetch();
        socket.emit("sendMessage");
        socket.emit("newConvo");
        setSettingMode(false);
      }
    }).catch(e=>{
      console.log(e)
    })
    
  }

  const handleAddMember=async (userId,userName)=>{
    await store.dispatch(apiSlice.endpoints.addGroupMember.initiate({userId,userName,chatId:activeConvo._id})).then(res=>{
      if(res.data.success){
        groupOptions.refetch();
        groupMembers.refetch();
        socket.emit("sendMessage");
        socket.emit("newConvo");
        setSettingMode(false)
      }
    })
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
            {groupOptions.data?.options&&<>
               {getGroupOptions().map(user=>(
                <div className="user-option" key={user._id}>
                  <div className="user-option-icon-cont">
                  <div className="user-option-icon">{user.name?user.name[0]:""}</div>
                  </div>
                  <div className="user-option-details">
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                  </div>
                  <div className="check-cont">
                    <button onClick={()=>{
                      handleAddMember(user._id,user.name?user.name:"")
                    }}>
                    <Image src={addUser} height={24} width={24} alt="add" />
                    </button>
                  </div>
                </div>
               ))}
            </>}
        </div>
      </div> }
      {type=="remove"&&<div className='remove-user-cont'>
            <div className="add-user-input-cont">
            <input type="text" className="add-user-input" value={removeSearch} onChange={e=>{setRemoveSearch(e.target.value)}} placeholder="Search user"/>
            </div>
        <div className="user-options-cont">   
            {groupMembers.data&&<>
               {getGroupMembers().map(user=>(
                <div className="user-option" key={user._id}>
                  <div className="user-option-icon-cont">
                  <div className="user-option-icon">{user?user.name[0]:""}</div>
                  </div>
                  <div className="user-option-details">
                    <div>{user.name}</div>
                    <div>{user.email}</div>
                  </div>
                  <div className="check-cont">
                    <button onClick={()=>{
                      handleRemoveUser(user._id,user.name?user.name:"")
                    }}>
                        <Image src={removeUser} height={24} width={24} alt="remove" />
                    </button>
                  </div>
                </div>
               ))}
            </>}
        </div>
      </div>}
    </div>
  )
}

export default ConvoSettings
