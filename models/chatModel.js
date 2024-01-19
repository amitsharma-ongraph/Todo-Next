import mongoose from "mongoose";


const chatSchema=mongoose.Schema({
    chatName:{
        type:String,
        required:true,
        trim:true,
    },
    isGroupChat:{
        type:Boolean,
        default:false
    },
    users:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }],
    latestMessage:{
        type:mongoose.Schema.type.ObjectId,
        ref:"message"
    },
    groupAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{
    timestamps:true
})

export default mongoose.model("chat",chatSchema)