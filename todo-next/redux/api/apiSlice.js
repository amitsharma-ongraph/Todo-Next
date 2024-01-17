import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const apiSlice=createApi({
    reducerPath:"posts",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/api"}),
    endpoints:builder=>({
        getAll:builder.query({
            query:(params)=>({
                url:"/todo/get-all",
                method:"post",
                body:{
                    userId:params.userId
                },
                headers:{
                    "authorization":params.token
                }
            })
        })
    })
});

export const {useGetAllQuery}=apiSlice