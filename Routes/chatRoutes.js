import express from "express"
import {addUserConvoController, createGroupController, endChatController, getAllConvoController, getAllUserController, getMessagesController, getReceiverController, getUserOptionsController, removeGroupUserController, sendMessageController, setSeenController} from "../controllers/convoController.js"
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
export default chatRouter;