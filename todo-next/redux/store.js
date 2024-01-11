
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/slices/userSlice";
import taskReducer from "@/redux/slices/taskSlice"


export default configureStore({
    reducer:{
        user:userReducer,
        taskId:taskReducer
    }
})
