import taskModel from "../models/todoModel.js"

export const getAllTaskController=async (req,res)=>{
    const {userId}=req.body
    console.log("userId",userId)
    try{
        const tasks=await taskModel.find({userId}).sort({createdAt:"desc"});
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
    if(!description){
        return res.status(500).send({
            success:false,
            message:"Description is required"
        })
    }
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

export const deleteTaskController=async(req,res)=>{
    
    await taskModel.findByIdAndDelete(req.query.id.toString()).then(()=>{
        res.status(200).send({
            success:true,
            message:"deletion successfull"
        })
    }).catch(e=>{
        console.log(e);
        res.status(500).send({
            success:false,
            message:"error while deleting task"
        })
    })
    
} 

export const getOneTaskController=async (req,res)=>{
    console.log("taskId:",req.query.id)
    try{
        const task=await taskModel.findById(req.query.id);
        res.status(200).send({
            success:true,
            task
        })
    }catch(e){
        console.log(e);
        return res.status(500).send({
            success:false,
            message:"error while fetching tasks"
        })
    }
}

export const updateTaskController=async (req,res)=>{
    const {title,description,status,id}=req.body;
    try{
        const task=await taskModel.findByIdAndUpdate(id,{title,description,status})
        res.status(200).send({
            success:true,
            message:"updated successfully"
        })
    }catch(e){
        console.log(e);
        return res.status(500).send({
            success:false,
            message:"error while updating task"
        })
    }
}