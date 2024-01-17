import { createSlice } from "@reduxjs/toolkit";


export const taskSlice = createSlice({
    name:"taskId",
    initialState:{
        id:"659f850b896110ad177997d6",
        task:{
            
        },
        disabled:true,
        reload:0
    },
    reducers:{
        updateTaskId:(state,action)=>{
            console.log(action.payload)
           state.id=action.payload
        } ,
        updateTask:(state,action)=>{
            state.task=action.payload
        },
        disabled:(state,action)=>{
            state.disabled=action.payload;
        },
        reload:(state)=>{
            state.reload+=1;
        }
    }
})
export const {updateTaskId,updateTask,disabled,reload}=taskSlice.actions
export const selectTaskId=state=>state.taskId.id
export const selectTask = state=>state.taskId.task
export const selectDisabled=state=>state.taskId.disabled
export const selectReload = state=>state.taskId.reload
export default taskSlice.reducer