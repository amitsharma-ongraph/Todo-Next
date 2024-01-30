import express from "express"
import {addGroupMemberController, addUserConvoController, createGroupController, endChatController, getAllConvoController, getAllUserController, getGroupMembersController, getGroupOptionController, getMessagesController, getReceiverController, getUserOptionsController, removeGroupUserController, sendMessageController, setSeenController} from "../controllers/convoController.js"
const chatRouter=express.Router();

chatRouter.post("/all-users",getAllUserController)
chatRouter.post("/get-receiver",getReceiverController)
chatRouter.post("/send-message",sendMessageController);
chatRouter.post("/add-user",addUserConvoController)
chatRouter.post("/create-group",createGroupController);
chatRouter.post("/get-allConvo",getAllConvoController);
chatRouter.post("/set-seen",setSeenController);
chatRouter.post("/get-messages",getMessagesController);
chatRouter.post("/get-options",getUserOptionsController);
chatRouter.post("/end-convo",endChatController);
chatRouter.post ("/remove-user",removeGroupUserController);
chatRouter.post("/get-groupOption",getGroupOptionController);
chatRouter.post("/add-member",addGroupMemberController);
chatRouter.post("/get-groupMembers",getGroupMembersController)
export default chatRouter;