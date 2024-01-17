"use client"
import { disabled, reload, selectDisabled, selectTask } from "@/redux/slices/taskSlice"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import "@/components/TodoComponents/updateForm/UpdateForm.css"
import axios from "axios";
import { selectToken } from "@/redux/slices/userSlice";


function UpdateForm() {
  const task=useSelector(selectTask);
  const disable =useSelector(selectDisabled);
  const dispatch=useDispatch();
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [status,setStatus]=useState("");
  

  useEffect(()=>{
      setTitle(task?task.title:"")
      setDescription(task?task.description:"")
      setStatus(task?task.status:"")
   },[task,])

   const handleUpdateTask =async ()=>{
    try{
      const res=await axios.post("http://localhost:5000/api/todo/update-task",{
        title,
        description,
        status,
        id:task._id
      })
      dispatch(disabled(true));
      dispatch(reload())
      console.log(res.data.message)
    }
    catch(e){
      console.log(e)
      console.log(e.response);
    }
   }
  return (
    <form className={`update-form ${disable==true?"disabled":""}`} onSubmit={(e)=>{e.preventDefault();handleUpdateTask()}}>
      <p>Title</p>
      <input disabled={disable} className='text-input input' value={title} onChange={(e)=>{setTitle(e.target.value)}}></input>
      <p>Description</p>
      <textarea disabled={disable} className='text-input input description ' value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
      <p>Status</p>
      <select  disabled={disable} className="input text-input"n ame="status" id="status" value={status} onChange={e=>{setStatus(e.target.value)}}>
        <option className="input text-input"  value="pending">pending</option>
        <option value="completed">completed</option>
      </select>
      {!disable&&<input className="submit input" type="submit" />}
    </form>
  )
}

export default UpdateForm
