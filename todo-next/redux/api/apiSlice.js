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
        getUserOption:builder.query({
            query:(params)=>({
                url:"/get-options",
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
                    chatId:params.chatId
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
                    senderId:params.senderId,
                    chatId:params.chatId,
                    content:params.content,
                    seenBy:params.seenBy
                },
                headers:{
                    "authorization":params.token
                }
            })
        }),
        getAllConvo:builder.query({
            query:(params)=>({
                url:"/get-allConvo",
                method:"post",
                body:{
                    userId:params.userId
                },
                headers:{
                    "authorization":params.token
                }
            })
        }),
        setSeen:builder.mutation({
            query:(params)=>({
                url:"/set-seen",
                method:"post",
                body:{
                    messageId:params.messageId,
                    senderId:params.senderId
                },
                headers:{
                    "authorization":params.token
                }
            })
        }),
        addUserConvo:builder.mutation({
            query:(params)=>({
                url:"/add-user",
                method:"post",
                body:{
                    chatName:params.users[0]+"-"+params.users[1],
                    users:params.users
                },
                headers:{
                    "authorization":params.token
                }
            })
        }),
        createGroup:builder.mutation({
            query:(params)=>({
                url:"/create-group",
                method:"post",
                body:{
                    chatName:params.chatName,
                    users:params.users,
                    groupAdmin:params.groupAdmin
                },
                headers:{
                    "authorization":params.token
                }
            })
        }),
        
    })
});

export const {useGetAllUsersQuery,useGetFriendUserQuery,useGetMessagesQuery,useGetAllConvoQuery,useGetUserOptionQuery}=apiSlice