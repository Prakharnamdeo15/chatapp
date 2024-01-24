const express = require("express");
const dotenv = require("dotenv");
const { default : mongoose } = require("mongoose");
const userRoutes = require("./Routes/userRoutes")
const chatRoutes = require("./Routes/chatRoutes")
const messageRoutes = require("./Routes/messageRoutes")
const cors = require("cors");
const http = require("http")
const {Server} = require("socket.io")



const app = express();
// app.use(cors());
app.use(
    cors({
      origin: "*",
    })
  );
  app.use(express.json());
  
  const server = http.createServer(app);
  const io = new Server(server,{
    cors:{
      origin:"*",
      methods:["GET", "POST"]
    }
  })

dotenv.config();

const connectDb = async ()=>{
    try{
    const connect = await mongoose.connect(process.env.MONGO_URI);
    }catch(err){
        console.log("server not connected",err.message)
    }
}

connectDb();


 
app.get("/",(req,res)=>{
    res.send("hello bhai")
});
app.use("/user",userRoutes) ;
app.use("/chat", chatRoutes);
app.use("/message", messageRoutes);

const PORT = process.env.PORT || 5000

io.on("connection", (socket) =>{
  // console.log(`user connected ${socket.id}`);
  socket.emit("connection")

  socket.on("newMessage", (data)=>{
    // socket.emit("messageRec",{data:1})

    console.log(data.data);
    socket.emit("gotMessage",data.data);
    // console.log(data);
  })
  socket.on("join_room",(roomName)=>{
    socket.join(roomName);
    // console.log("joined room"+roomName)
  })
});


server.listen(PORT,console.log("server is running on 5000"));


