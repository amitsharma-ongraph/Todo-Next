import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"


export const apiSlice=createApi({
    reducerPath:"chatApi",
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:5000/api/chat"}),
    endpoints:builder=>({
        getAllUsers:builder.query({
            query:(params)=>({
                url:"/all-users",
                method:"post",
                body:{
                    userId:params.userId
                },
                headers:{
                    "authorization":params.token
                }
            })
        }),
        getFriendUser:builder.query({
            query:(params)=>({
                url:"/get-receiver",
                method:"post",
                body:{
                    receiverId:params.friendUserId
                },
                headers:{
                    "authprization":params.token
                }
            })
        }),
        getMessages:builder.query({
            query:(params)=>({
                url:"/get-messages",
                method:"post",
                body:{
                    user1:params.hostUserId,
                    user2:params.friendUserId
                },
                headers:{
                    "authorization":params.token
                }
            })
        }),
        sendMessage:builder.mutation({
            query:(params)=>({
                url:"/send-message",
                method:"post",
                body:{
                    senderId:params.hostUserId,
                    receiverId:params.friendUserId,
                    content:params.content
                },
                headers:{
                    "authorization":params.token
                }
            })
        })
    })
});

export const {useGetAllUsersQuery,useGetFriendUserQuery,useGetMessagesQuery}=apiSlice