import mongoose from "mongoose";



const messageSchema=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    content:{
        type:String,
        trim:"true",
        required:true
    }
},{
    timestamps:true
})

export default mongoose.model("message",messageSchema);