import express from "express"
import {getAllUserController, getMessagesController, getReceiverController, sendMessageController} from "../controllers/convoController.js"
const chatRouter=express.Router();

chatRouter.post("/all-users",getAllUserController)
chatRouter.post("/get-receiver",getReceiverController)
chatRouter.post("/send-message",sendMessageController);
chatRouter.post("/get-messages",getMessagesController)
export default chatRouter;