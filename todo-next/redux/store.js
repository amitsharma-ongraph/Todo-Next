
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/slices/userSlice";
import taskReducer from "@/redux/slices/taskSlice"
import {apiSlice} from "@/redux/api/apiSlice"


export default configureStore({
    reducer:{
        user:userReducer,
        taskId:taskReducer,
        posts:apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})
 