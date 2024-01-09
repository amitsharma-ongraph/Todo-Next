import mongoose,{Schema} from "mongoose";

const taskSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    status:{
        type:String
    },
    userId:{
        type:mongoose.ObjectId,
        ref:"users",
        required:true
    }
},
    {
        timestamps:true 
    }
)

export default mongoose.model("task",taskSchema)