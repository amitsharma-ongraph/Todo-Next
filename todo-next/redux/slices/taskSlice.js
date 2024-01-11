import { createSlice } from "@reduxjs/toolkit";


export const taskSlice = createSlice({
    name:"taskId",
    initialState:{
        id:""
    },
    reducers:{
        updateTask:(state,action)=>{
            console.log(action.payload)
           state.id=action.payload
        } 
    }
})
export const {updateTask}=taskSlice.actions
export const selectTaskId=state=>state.taskId.id
export default taskSlice.reducer