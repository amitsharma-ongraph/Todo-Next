"use client"
import axios from "axios";
import React, { useState } from "react";

function TaskForm({userId,getTasks}) {
  
    const[title,setTitle]=useState("");
    const[description,setDescription]=useState("");

    const handleCreateTask=async(e)=>{
        try {
         const res=await axios.post("http://localhost:5000/api/todo/add-task",{
           title,
           description,
           userId
         });
         setTitle("");
         setDescription("");
         getTasks();
        } catch (error) {
         console.log(error.response.data)
        }
       } 

  return (
    <>
      <h2>New Task</h2>
      <form
        className=""
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateTask();
        }}
      >
        <input
          placeholder="Enter the title"
          className="text-input title-input input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          placeholder="Enter the description"
          className="text-input description input"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input type="submit" className="submit input" />
      </form>
    </>
  );
}

export default TaskForm;
