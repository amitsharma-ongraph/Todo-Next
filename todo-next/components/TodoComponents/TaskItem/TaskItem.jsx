"use client"
import "@/components/TodoComponents/TaskItem/TaskItem.css"
import Image from "next/image"
import taskItemIcon from "@/public/images/task-item.png"
import deleteIcon from "@/public/images/bin.png"
import clsx from "clsx"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { updateTaskId,selectTaskId, reload} from "@/redux/slices/taskSlice"

function TaskItem({task,getTasks}) {
 const dispatch = useDispatch();
 const taskId=useSelector(selectTaskId);

  const handleDelete=async ()=>{
    try {
      const res=axios.delete(`http://localhost:5000/api/todo/delete-task?id=${task._id}`);
      console.log(res.data)
      dispatch(reload())
    } catch (error) {
      console.log(error);
    }
  }

 

  const title = task.title.length>30?`${task.title.substr(0,22)}...`:task.title
  return (
    <div className="task-item-cont">
    {task._id==taskId && <div className="bar"></div>}
    <div className={clsx("task-item",{
      "active":task._id==taskId
    })} onClick={()=>{dispatch(updateTaskId(task._id))}}>
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
