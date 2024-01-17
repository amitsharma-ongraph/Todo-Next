'use client'
import "@/app/todo/todoHome.css"
import axios from "axios";
import { useEffect, useState } from "react"
import TaskList from "@/components/TodoComponents/TaskList/TaskList"
import TaskForm from "@/components/TodoComponents/TaskForm/TaskForm"
import TaskDetails from "@/components/TodoComponents/TaskDetails/TaskDetails"
import { useDispatch, useSelector} from "react-redux";
import {selectReload, updateTaskId} from "@/redux/slices/taskSlice";
import {selectUserId } from "@/redux/slices/userSlice";

function HomePage() {
  const userId=useSelector(selectUserId);
  const reload=useSelector(selectReload)
  const [tasks,setTasks]=useState([]);
  const dispatch=useDispatch();

  useEffect(()=>{
    getTasks();
  },[reload]);

  const getTasks=async ()=>{
    try{
     const res=await axios.post("http://localhost:5000/api/todo/get-all",{userId});
     setTasks(res.data.tasks);
     console.log(tasks);
     if(res.data.tasks){
      dispatch(updateTaskId(res.data.tasks[0]._id))
     }
    }catch(e){
      console.log(e);
    }
  }

 
  return (

    <div className="grid grid-cols-3 todo-cont">
      <div className="form-cont flex flex-col justify-start items-center">
        <TaskForm userId={userId} getTasks={getTasks}/>
      </div>
      <div className="task-cont flex flex-col justify-start items-center task-list">
        <TaskList tasks={tasks} />
      </div>
      <div className="detail-cont flex flex-col justify-start items-center">
        {tasks&&<TaskDetails getTasks={getTasks}/>}
      </div>
    </div>
  )
}

export default HomePage
