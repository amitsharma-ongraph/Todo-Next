import express from "express"
import { addNewTaskController, deleteTaskController, getAllTaskController, getOneTaskController, updateTaskController } from "../controllers/todoController.js";
import { authenticate } from "../middlewares/authMiddlewares.js";


const todoRouter =express.Router();

todoRouter.post("/get-all",authenticate,getAllTaskController)

todoRouter.post("/add-task",authenticate,addNewTaskController)

todoRouter.delete("/delete-task",authenticate,deleteTaskController);

todoRouter.get("/get-one",authenticate,getOneTaskController);

todoRouter.post("/update-task",authenticate,updateTaskController)

export default todoRouter;

