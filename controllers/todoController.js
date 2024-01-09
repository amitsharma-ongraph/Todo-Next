import taskModel from "../models/todoModel.js"

export const getAllTaskController=async (req,res)=>{
    const {userId}=req.body
    try{
        const tasks=await taskModel.find({userId});
        res.status(200).send({
            success:true,
            tasks
        })
    }catch(e){
        console.log(e);
        return res.status(500).send({
            success:false,
            message:"error while fetching tasks"
        })
    }
}

export const addNewTaskController = async(req,res)=>{
    const {title,description,userId} = req.body;
    const newTask=await new taskModel({
        title,
        description,
        userId,
        status:"pending"
    }).save().then(task=>{
        return res.status(201).send({
            success:true,
            message:"Task added successfully",
            task
        })
    }).catch(e=>{
        console.log(e)
        return res.status(500).send({
            success:false,
            message:"Error while adding new task"
        })
    })
}