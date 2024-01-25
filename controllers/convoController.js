import chatModel from "../models/chatModel.js"
import messageModel from "../models/messageModel.js"
import userModel from "../models/userModel.js"


export const getAllUserController=async (req,res)=>{
    const {userId}=req.body
    try{
        const users =await userModel.find({_id:{$ne:userId}})
        res.status(200).send({
            success:true,
            message:"users fetched successfully",
            users
        })
    }catch(e){
        res.status(500).send({
            success:false,
            message:"error while fetching users"
        })
    }
}
export const getReceiverController=async(req,res)=>{
    const {receiverId}=req.body
    try{
        const user=await userModel.findOne({_id:receiverId})
        if(!user){
            res.status(500).send({
                success:false,
                message:"receiver not found"
            })
        }
        else{
            res.status(200).send({
                success:true,
                message:"Receiver fetched",
                user
            })
        }
    }catch(e){
        res.status(500).send({
            success:false,
            message:"error while getting receiver"
        })
    }
}

export const addUserConvoController=async (req,res)=>{
    const {chatName,users}=req.body;
    try{
        const newChat=await new chatModel({chatName,users}).save();
        return res.status(201).send({
            success:true,
            message:"conversation created",
            chat:newChat
        })
    }catch(e){
        console.log(e);
        return res.status(500).send({
            success:false,
            message:"error while creating a new conversation"
        })
    }
}

export const createGroupController=async(req,res)=>{
    const {chatName,users,groupAdmin}=req.body;
    try{
        const newGroup=await new chatModel({chatName,users,groupAdmin,isGroupChat:true}).save();
        return res.status(201).send({
            success:true,
            message:"Group Created"
        })
    }catch(e){
        console.log(e);
        res.status(500).send({
            success:false,
            message:"error while creating a group"
        })
    }
}

export const getAllConvoController=async(req,res)=>{
    const {userId}=req.body;
    try{
        const allConvo=await chatModel.find({users:userId}).populate("users").populate("latestMessage").sort({updatedAt:"desc"});
        allConvo.forEach(convo=>{
            if(!convo.isGroupChat){
                let i=convo.users[0]._id==userId?1:0;
                convo.chatName=convo.users[i].name;
            }
        })
        res.status(200).send({
            success:true,
            message:"conversations fetched successfully",
            conversations:allConvo
        })
    }catch(e){
        res.status(500).send({
            success:false,
            message:"error while fetching conversations"
        })
    }
}

export const sendMessageController =async (req,res)=>{
    const {senderId,chatId,content,seenBy}=req.body;

    const newMessage=await new messageModel({senderId,chatId,content,seenBy}).save().then(async (newMessage)=>{
        const chat=await chatModel.findByIdAndUpdate(chatId,{latestMessage:newMessage._id});
        return res.status(201).send({
            success:true,
            message:"message sent successfully"
        })
    }).catch(e=>{
        console.log(e)
        return res.status(500).send({
            success:true,
            message:"error while sending the message"
        })
    });
}

export const setSeenController=async(req,res)=>{
    const {senderId,messageId}=req.body
    const message=await messageModel.findById(messageId).then(async (message)=>{
        const newSeenBy=await message.seenBy.filter(user=>user!=senderId);
        console.log(senderId);
        console.log("new seen by",newSeenBy)
        const updatedMessage=await messageModel.findByIdAndUpdate(message._id,{seenBy:newSeenBy});
        res.status(200).send({
            success:true,
            message:"seen updated successfully"
        })
    }).catch(e=>{
        console.log(e)
        res.status(500).send({
            success:false,
            message:"error while updating seen"
        })
    })
}

export const getMessagesController = async(req,res)=>{
    const {chatId}=req.body;
    const messages=await messageModel.find({chatId}).populate("senderId").sort({createdAt:"desc"}).then(async (messages)=>{
        const formated=await formatMessages(messages);
        return res.status(200).send({
            success:true,
            message:"messages fetched successfully",
            messages:formated
        })
    }).catch(e=>{
        console.log(e);
        return res.status(500).send({
            success:false,
            message:"error while fetching messages"
        })
    })
}

const formatMessages = async(messages)=>{
    for(let i=0;i<messages.length;i++){
        let id1=messages[i].senderId;
        id1=id1.toString();
        let id2=messages[i+1]?messages[i+1].senderId:"none";
        id2=id2.toString();
        if(id1!=id2){
            messages[i]={
                senderId:messages[i].senderId,
                seenBy:messages[i].seenBy,
                createdAt:messages[i].createdAt,
                chatId:messages[i].chatId,
                _id:messages[i]._id,
                content:messages[i].content,
                isDeleted:messages[i].isDeleted,
                position:"top"
            };
        }
        else{
            messages[i]={
                senderId:messages[i].senderId,
                seenBy:messages[i].seenBy,
                createdAt:messages[i].createdAt,
                chatId:messages[i].chatId,
                _id:messages[i]._id,
                content:messages[i].content,
                isDeleted:messages[i].isDeleted,
                position:"middle"
            }
        }
        let date1=new Date(messages[i].createdAt).toLocaleDateString();
        let date2=messages[i+1]?new Date(messages[i+1].createdAt).toLocaleDateString():"none";
        if(date1!=date2||i==messages.length-1){
            messages[i]={
                senderId:messages[i].senderId,
                seenBy:messages[i].seenBy,
                createdAt:messages[i].createdAt,
                chatId:messages[i].chatId,
                _id:messages[i]._id,
                content:messages[i].content,
                isDeleted:messages[i].isDeleted,
                position:"top",
                showDate:true
            }
        }
    }
    return messages
}