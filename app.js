import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser";
import connectDb from "./database.js";
import authRouter from "./Routes/authRoutes.js";
import todoRouter from "./Routes/todoRoutes.js";
import cors from "cors"
import { Server} from "socket.io";
import http from "http"

 
dotenv.config();

const port = process.env.PORT;
  
const app = express();

const server=http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:"*",
        credentials:true
    }
});
app.set("socket.io",io);
//middlewares 
app.use(bodyParser.json());
app.use(cors()); 


//routes
app.use("/api/auth",authRouter);
app.use("/api/todo",todoRouter);
app.get("/", (req, res) => {
    res.send("hey!")  
})


connectDb().then(() => {
    server.listen(port, () => {
        console.log("app started on",port)
    })
})

io.on("connection", (socket) => {
    console.log("Socket connected "+socket)
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      console.log(userData._id + " connected")
      socket.emit("connected");
    });
    socket.on('sendMessage', (message) => {
        io.emit('message', message);
        console.log("message received")
    });
})
io.on("connect_error", (error) => {
    console.error("Connection error:", error);
});

io.on("error", (error) => {
    console.error("Socket.IO error:", error);
});