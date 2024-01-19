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

export const sendMessageController=async(req,res)=>{
    const {senderId,receiverId,content}=req.body
    const message=new messageModel({senderId,receiverId,content}).save().then(msg=>{
            return res.status(201).send({
                success:true,
                message:"message sent successfully"
            })
        }).catch(e=>{
        res.status(500).send({
            success:false,
            message:"error while sending the message"
        })
    })
}

export const getMessagesController=async(req,res)=>{
    const {user1,user2}=req.body
    try{
    const messages=await messageModel.find(
        {$or:[
            {$and:[{senderId:user1},
                   {receiverId:user2}]
            },
            {$and:[{receiverId:user1},
                   {senderId:user2}]
            }]
        }
    ).sort({createdAt:"desc"});
    return res.status(200).send({
        success:true,
        messages:"messages fethced successfully",
        messages
    })
    }catch(e){
        console.log(e)
        return res.status(500).send({
            success:false,
            message:"error while fetching messages"
        })
    }
}