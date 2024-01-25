import mongoose from "mongoose";



const messageSchema=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat",
        required:true
    },
    content:{
        type:String,
        trim:"true",
        required:true
    },
    seenBy:[{
        type:mongoose.Schema.Types.ObjectId,
        red:"users"
    }],
    isDeleted:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

export default mongoose.model("message",messageSchema);