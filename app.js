import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import connectDb from "./database.js";
import authRouter from "./Routes/authRoutes.js";
import todoRouter from "./Routes/todoRoutes.js";
import cors from "cors"
import { Server} from "socket.io";
import http from "http"
import chatRouter from "./Routes/chatRoutes.js";

 
dotenv.config();

const port = process.env.PORT;
  
const app = express();

const server=http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*"
    }
});
app.set("socket.io",io);
//middlewares 
app.use(bodyParser.json());
app.use(cors()); 


//routes
app.use("/api/auth",authRouter);
app.use("/api/todo",todoRouter);
app.use("/api/chat",chatRouter);
app.get("/", (req, res) => {
    res.send("hey!")  
})


connectDb().then(() => {
    server.listen(port, () => {
        console.log("app started on",port)
    })
})

let activeUsers=[];

const getUsersList=(activeUsers)=>{
   let users=[];
   activeUsers.forEach(user => {
    users.push(user.userId)
   });
   return users
}
io.on("connection", (socket) => {
    console.log("Socket connected ")
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      console.log(userData._id + " connected")
      socket.emit("connected");
    });
    socket.on('sendMessage', () => {
        io.emit('message');
        console.log("message received")
    });
    socket.on("setOnline",({userId,socketId})=>{
        if(!activeUsers.some((user)=>user.userId===userId)){
            activeUsers.push({userId,socketId});
        }
        console.log("a user is connected",activeUsers)
        io.emit("activeUsers",getUsersList(activeUsers));
    })
    socket.on("disconnect",()=>{
        activeUsers=activeUsers.filter(user=>user.socketId!==socket.id)
        console.log(" a user disconnected",activeUsers)
        io.emit("activeUsers",getUsersList(activeUsers));
    })
}) 
io.on("connect_error", (error) => {
    console.error("Connection error:", error);
});

io.on("error", (error) => {
    console.error("Socket.IO error:", error);
});