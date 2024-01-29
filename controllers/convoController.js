import chatModel from "../models/chatModel.js"
import messageModel from "../models/messageModel.js"
import userModel from "../models/userModel.js"


export const getAllUserController = async (req, res) => {
    const { userId } = req.body
    try {
        const users = await userModel.find({ $and: [{ _id: { $ne: userId } }, { _id: { $ne: "65b0b29602b7aefdaa2ccac8" } }] })
        res.status(200).send({
            success: true,
            message: "users fetched successfully",
            users
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            message: "error while fetching users"
        })
    }
}
export const getUserOptionsController = async (req, res) => {
    const { userId } = req.body;

    const allConvo = await chatModel.find({ $and: [{ isGroupChat: false }, { users: userId }] }).then(async (allConvo) => {
        const allUsers = await userModel.find({ $and: [{ _id: { $ne: userId } }, { _id: { $ne: "65b0b29602b7aefdaa2ccac8" } }] }).then(async (allUsers) => {
            const options = await getOptions(allConvo, allUsers);
            res.status(200).send({
                success: true,
                message: "options fetched successfullly",
                options
            })
        })
    }).catch((e) => {
        res.status(500).send({
            success: false,
            message: "error while fetching user optins"
        })
    })

}

const getOptions = async (allConvo, allUsers) => {
    let users = [];
    await allUsers.forEach(async user => {
        let add = true
        allConvo.forEach(convo => {
            if (convo.users[0].toString() == user._id.toString() || convo.users[1].toString() == user._id.toString()) {
                add = false
            }
        })
        if (add) {
            users.push(user)
        }
    })
    // console.log(allUsers)
    return users;
}
export const getReceiverController = async (req, res) => {
    const { receiverId } = req.body
    try {
        const user = await userModel.findOne({ _id: receiverId })
        if (!user) {
            res.status(500).send({
                success: false,
                message: "receiver not found"
            })
        }
        else {
            res.status(200).send({
                success: true,
                message: "Receiver fetched",
                user
            })
        }
    } catch (e) {
        res.status(500).send({
            success: false,
            message: "error while getting receiver"
        })
    }
}

export const addUserConvoController = async (req, res) => {
    const { chatName, users } = req.body;
    try {
        const newChat = await new chatModel({ chatName, users }).save().then(async (newChat) => {
            const botMessage = await new messageModel({ senderId: "65b0b29602b7aefdaa2ccac8", chatId: newChat._id, content: "Conversation created" }).save().then(async (botMessage) => {
                await chatModel.findByIdAndUpdate(newChat._id, { latestMessage: botMessage._id }).then(() => {
                    return res.status(201).send({
                        success: true,
                        message: "conversation created",
                        chat: newChat
                    })
                })
            })
        }).catch(e => {
            console.log(e);
            return res.status(500).send({
                success: false,
                message: "error while creating a new conversation"
            })
        });

    } catch (e) {
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "error while creating a new conversation"
        })
    }
}

export const createGroupController = async (req, res) => {
    const { chatName, users, groupAdmin } = req.body;
    try {
        const newGroup = await new chatModel({ chatName, users, groupAdmin, isGroupChat: true }).save().then(async (newChat) => {
            const botMessage = await new messageModel({ senderId: "65b0b29602b7aefdaa2ccac8", chatId: newChat._id, content: "Group created" }).save().then(async (botMessage) => {
                await chatModel.findByIdAndUpdate(newChat._id, { latestMessage: botMessage._id }).then(() => {
                    return res.status(201).send({
                        success: true,
                        message: "conversation created",
                        chat: newChat
                    })
                })
            })
        }).catch(e => {
            console.log(e);
            return res.status(500).send({
                success: false,
                message: "error while creating a new conversation"
            })
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            success: false,
            message: "error while creating a group"
        })
    }
}

export const getAllConvoController = async (req, res) => {
    const { userId } = req.body;
    try {
        const allConvo = await chatModel.find({ users: userId }).populate("users").populate("latestMessage").sort({ updatedAt: "desc" });
        allConvo.forEach(convo => {
            if (!convo.isGroupChat) {
                let i = convo.users[0]._id == userId ? 1 : 0;
                convo.chatName = convo.users[i].name;
            }
        })
        res.status(200).send({
            success: true,
            message: "conversations fetched successfully",
            conversations: allConvo
        })
    } catch (e) {
        res.status(500).send({
            success: false,
            message: "error while fetching conversations"
        })
    }
}

export const sendMessageController = async (req, res) => {
    const { senderId, chatId, content, seenBy } = req.body;

    const newMessage = await new messageModel({ senderId, chatId, content, seenBy }).save().then(async (newMessage) => {
        const chat = await chatModel.findByIdAndUpdate(chatId, { latestMessage: newMessage._id });
        return res.status(201).send({
            success: true,
            message: "message sent successfully"
        })
    }).catch(e => {
        console.log(e)
        return res.status(500).send({
            success: true,
            message: "error while sending the message"
        })
    });
}

export const setSeenController = async (req, res) => {
    const { senderId, messageId } = req.body
    const message = await messageModel.findById(messageId).then(async (message) => {
        message.seenBy.push(senderId);
        console.log(senderId);
        console.log("new seen by", message.seenBy)
        const updatedMessage = await messageModel.findByIdAndUpdate(message._id, { seenBy: message.seenBy })
        res.status(200).send({
            success: true,
            message: "seen updated successfully"
        })
    }).catch(e => {
        console.log(e)
        res.status(500).send({
            success: false,
            message: "error while updating seen"
        })
    })
}

export const getMessagesController = async (req, res) => {
    const { chatId } = req.body;
    const messages = await messageModel.find({ chatId }).populate("senderId").sort({ createdAt: "desc" }).then(async (messages) => {
        const formated = await formatMessages(messages);
        return res.status(200).send({
            success: true,
            message: "messages fetched successfully",
            messages: formated
        })
    }).catch(e => {
        console.log(e);
        return res.status(500).send({
            success: false,
            message: "error while fetching messages"
        })
    })
}

const formatMessages = async (messages) => {
    for (let i = 0; i < messages.length; i++) {
        let id1 = messages[i].senderId;
        id1 = id1.toString();
        let id2 = messages[i + 1] ? messages[i + 1].senderId : "none";
        id2 = id2.toString();
        if (id1 != id2) {
            messages[i] = {
                senderId: messages[i].senderId,
                seenBy: messages[i].seenBy,
                createdAt: messages[i].createdAt,
                chatId: messages[i].chatId,
                _id: messages[i]._id,
                content: messages[i].content,
                isDeleted: messages[i].isDeleted,
                position: "top"
            };
        }
        else {
            messages[i] = {
                senderId: messages[i].senderId,
                seenBy: messages[i].seenBy,
                createdAt: messages[i].createdAt,
                chatId: messages[i].chatId,
                _id: messages[i]._id,
                content: messages[i].content,
                isDeleted: messages[i].isDeleted,
                position: "middle"
            }
        }
        let date1 = new Date(messages[i].createdAt).toLocaleDateString();
        let date2 = messages[i + 1] ? new Date(messages[i + 1].createdAt).toLocaleDateString() : "none";
        if (date1 != date2 || i == messages.length - 1) {
            messages[i] = {
                senderId: messages[i].senderId,
                seenBy: messages[i].seenBy,
                createdAt: messages[i].createdAt,
                chatId: messages[i].chatId,
                _id: messages[i]._id,
                content: messages[i].content,
                isDeleted: messages[i].isDeleted,
                position: "top",
                showDate: true
            }
        }
    }
    return messages
}

export const endChatController = async (req, res) => {
    const { userId, chatId, isGroupChat,userName } = req.body;
    if (!isGroupChat) {
        await messageModel.deleteMany({chatId}).then(async ()=>{
            await chatModel.findByIdAndDelete(chatId).then(()=>{
                res.status(200).send({
                    success:true,
                    message:"chat ended successfully"
                })
            })
        }).catch(e=>{
            console.log(e)
            return res.status(500).send({
                success:false,
                message:"error while ending the chat"
            })
        })
    }
    else{
        console.log(userId)
        await chatModel.findById(chatId).then(async (chat)=>{
            console.log("users",chat.users)
           const newUsers=chat.users.filter((user)=>user._id!=userId);
           await chatModel.findByIdAndUpdate(chat._id,{users:newUsers}).then(async()=>{
            const botMessage = await new messageModel({ senderId: "65b0b29602b7aefdaa2ccac8", chatId: chat._id, content: userName+" left the group" }).save().then(async (botMessage) => {
                await chatModel.findByIdAndUpdate(chat._id, { latestMessage: botMessage._id }).then(() => {
                    return res.status(200).send({
                        success: true,
                        message: "removed successfully",
                    })
                })
            })
           })

        }).catch(e=>{
            console.log(e)
            return res.status(500).send({
                success:false,
                message:"error while ending the chat"
            })
        })
    }
}

export const removeGroupUserController=async (req,res)=>{
    const {users,chatId,adminName,userNames}=req.body;
    console.log(users);
    const chat = await chatModel.findById(chatId).then(async (chat)=>{
       console.log(chat.users)
       let newUsers=[]
       chat.users.forEach(chatUser=>{
         if(!users.includes(chatUser._id.toString())){
            newUsers.push(chatUser)
         }
       })
       console.log(newUsers)
       await chatModel.findByIdAndUpdate(chat._id,{users:newUsers}).then(async ()=>{
        let userNamesString="";
        userNames.forEach(name=>{userNamesString+" "+name})
        const botMessage = await new messageModel({ senderId: "65b0b29602b7aefdaa2ccac8", chatId: chat._id, content: adminName+" removed "+ userNamesString}).save().then(async (botMessage) => {
            await chatModel.findByIdAndUpdate(chat._id, { latestMessage: botMessage._id }).then(() => {
                return res.status(200).send({
                    success: true,
                    message: "removed successfully",
                })
            })
        })
       })
    }).catch(e=>{
        console.log(e)
        return res.status(500).send({
            success:false,
            message:"error while removing user"
        })
    })
}