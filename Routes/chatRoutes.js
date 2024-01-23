import express from "express"
import {addUserConvoController, createGroupController, getAllConvoController, getAllUserController, getMessagesController, getReceiverController, sendMessageController} from "../controllers/convoController.js"
const chatRouter=express.Router();

chatRouter.post("/all-users",getAllUserController)
chatRouter.post("/get-receiver",getReceiverController)
chatRouter.post("/send-message",sendMessageController);
chatRouter.post("/get-messages",getMessagesController)
chatRouter.post("/add-user",addUserConvoController)
chatRouter.post("/create-group",createGroupController);
chatRouter.post("/get-allConvo",getAllConvoController)
export default chatRouter;