import mongoose from "mongoose";

const userSchema=mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  }
})

export default mongoose.model("users",userSchema);