import dotenv from "dotenv"
import mongoose from "mongoose"

dotenv.config();

const uri=process.env.DB_URI;
const connectDb = async()=>{
    await mongoose.connect(uri).then(()=>{
        console.log("Connected to database");
    }).catch(err=>{
        console.log(err)
    })
}
export default connectDb