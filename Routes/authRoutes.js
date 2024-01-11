import express from "express"
import { loginController, registerController } from "../controllers/authController.js";
import { authenticate } from "../middlewares/authMiddlewares.js";

const authRouter = express.Router();

authRouter.post("/login",loginController);
authRouter.post("/register",registerController)
authRouter.get("/verify",authenticate,(req,res)=>{
    res.status(200).send({
        success:true,
        message:"authorized"
    })
})
export default authRouter;