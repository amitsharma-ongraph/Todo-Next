"use client"
import "@/components/TaskDetails/TaskDetails.css"
import { selectTaskId } from "@/redux/slices/taskSlice";
import axios from "axios";
import { useEffect, useState } from "react"
import { useSelector } from "react-redux";

function TaskDetails() {
   const [task,setTask]=useState({})
   const taskId=useSelector(selectTaskId)
   console.log("task",taskId)
   useEffect(()=>{
     if(taskId!=""){
        getTask();
     }
   },[])
   const getTask=async ()=>{
    try {
        const res=await axios.get(`http://localhost:5000/api/todo/get-one?id=${taskId}`)
        setTask(res.data.task)
        console.log(task)
        setTitle(task.title)
    } catch (error) {
        
    }
   } 
  return (
    <div className="details">
      <div><h2 className="det-h">Task Details</h2></div>
      <div><h2 className="det-h">Task Details</h2></div>
      <div className="det">
        <p>Title</p>
        <div className="sec"><p>{task.title}</p></div>
        <p>Description</p>
        <div className="sec"><p>{task.description}</p></div>
        <p>Staus</p>
        <div className="sec"><p>{task.status}</p></div>
        <p>CreatedAt</p>
        <div className="sec"><p>{Date(task.createdAt)}</p></div>
      </div>
    </div>
  )
}

export default TaskDetails
