"use client"
import "@/components/TodoComponents/TaskList/TaskList.css"
import TaskItem from "@/components/TodoComponents/TaskItem/TaskItem"

function TaskList({tasks,activeTask,setActiveTask,getTasks}) {
  return (
    <div className="task-list-cont">
      <div className="heading">
        <h2>All Tasks</h2>
      </div>
      <div className="options">
        {/* <h2>options</h2> */}
      </div>
      <div className="task-list">
        {tasks.length==0&&<div className="no-items">No Tasks</div>}
        {tasks.length!=0&&tasks.map(task=>{
            return (
                <TaskItem task={task} key={task._id} activeTask={activeTask} setActiveTask={setActiveTask} getTasks={getTasks}/>
            )
        })
        }
      </div>
    </div>
  )
}

export default TaskList
