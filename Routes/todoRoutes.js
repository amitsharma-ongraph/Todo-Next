import express from "express"
import { addNewTaskController, getAllTaskController } from "../controllers/todoController.js";
import { authenticate } from "../middlewares/authMiddlewares.js";


const todoRouter =express.Router();

todoRouter.get("/get-all",authenticate,getAllTaskController)

todoRouter.post("/add-task",authenticate,addNewTaskController)


export default todoRouter;

