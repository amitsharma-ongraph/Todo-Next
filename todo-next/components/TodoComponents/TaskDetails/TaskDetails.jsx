"use client"
import "@/components/TodoComponents/TaskDetails/TaskDetails.css"
import { disabled, selectDisabled, selectTaskId, updateTask } from "@/redux/slices/taskSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import UpdateForm from "@/components/TodoComponents/updateForm/UpdateForm"

function TaskDetails() {
   let task={}
   let taskId=useSelector(selectTaskId);
   const disable=useSelector(selectDisabled);

   const dispatch=useDispatch()

   const toggleDisabled=()=>{
    dispatch(disabled(disable==true?false:true))
   }
   const getTask=async ()=>{
    try {
        const res=await axios.get(`http://localhost:5000/api/todo/get-one?id=${taskId}`)
        task=res.data.task
        dispatch(updateTask(task))
    } catch (error) {
        console.log(error.response)
    }
   } 
   getTask();

  return (
    <div className="details">
      <div><h2 className="det-h">Task Details</h2></div>
      <div><button className="submit" onClick={toggleDisabled}>edit</button></div>
      <div className="det">
        <UpdateForm/>
      </div>
    </div>
  )
}

export default TaskDetails
