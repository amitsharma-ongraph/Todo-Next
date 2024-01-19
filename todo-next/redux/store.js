
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/slices/userSlice";
import taskReducer from "@/redux/slices/taskSlice";
import chatDataReducer from "@/redux/slices/chatDataSlice"
import {apiSlice} from "@/redux/api/apiSlice"

export default configureStore({
    reducer:{
        user:userReducer,
        taskId:taskReducer,
        chatApi:apiSlice.reducer,
        chatData:chatDataReducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware)
})
 