'use client'
import "@/app/home/home.css"
import axios from "axios";
import { useEffect, useState } from "react"
import TaskList from "@/components/TaskList/TaskList"
import TaskForm from "@/components/TaskForm/TaskForm"
import TaskDetails from "@/components/TaskDetails/TaskDetails"

function HomePage() {
  const userId="6597e9ddc548f6c7e0d828a5"
  const [tasks,setTasks]=useState([]);
  const [activeTask,setActiveTask]=useState("")

  useEffect(()=>{
    getTasks();
  },[])

  const getTasks=async ()=>{
    try{
     const res=await axios.post("http://localhost:5000/api/todo/get-all",{userId});
     setTasks(res.data.tasks);
     console.log(tasks);
     if(res.data.tasks){
      setActiveTask(res.data.tasks[0]._id);
      console.log(activeTask);
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
        <TaskList tasks={tasks} activeTask={activeTask} setActiveTask={setActiveTask}/>
      </div>
      <div className="detail-cont flex flex-col justify-start items-center">
        {tasks&&<TaskDetails taskId={activeTask} getTasks={getTasks}/>}
      </div>
    </div>
  )
}

export default HomePage
