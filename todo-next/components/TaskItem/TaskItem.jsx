"use client"
import "@/components/TaskItem/TaskItem.css"
import Image from "next/image"
import taskItemIcon from "@/public/images/task-item.png"
import deleteIcon from "@/public/images/bin.png"
import clsx from "clsx"
import { useDispatch } from "react-redux"
import axios from "axios"
import { updateTask } from "@/redux/slices/taskSlice"

function TaskItem({task,activeTask,setActiveTask,getTasks}) {
 const dispatch = useDispatch();
  const handleDelete=async ()=>{
    try {
      const res=axios.delete(`http://localhost:5000/api/todo/delete-task?id=${task._id}`);
      console.log(res.data)
      getTasks();
    } catch (error) {
      console.log(error);
    }
  }
  task.status="completed"
  const title = task.title.length>30?`${task.title.substr(0,22)}...`:task.title
  return (
    <div className="task-item-cont">
    {task._id==activeTask && <div className="bar"></div>}
    <div className={clsx("task-item",{
      "active":task._id==activeTask
    })} onClick={()=>{dispatch(updateTask(task._id))}}>
      <Image src={taskItemIcon} alt="task" height={24} width={24}/>
      <div className="task-title">
        <p>{title.toUpperCase()}</p>
      </div>
      <div className={clsx("status",{
        "red":task.status=="pending",
        "green":task.status=="completed"
      })}>
        <p>{task.status}</p>
      </div>
      <button className="delete-btn" onClick={handleDelete}>
        <Image src={deleteIcon} alt="delete" height={16} width={16}/>
      </button>
    </div>
    </div>
  )
}

export default TaskItem
