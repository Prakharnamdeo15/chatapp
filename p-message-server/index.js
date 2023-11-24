const express = require("express");
const dotenv = require("dotenv");
const { default : mongoose } = require("mongoose");
const userRoutes = require("./Routes/userRoutes")
const chatRoutes = require("./Routes/chatRoutes")
const messageRoutes = require("./Routes/messageRoutes")
const cors = require("cors");



const app = express();
app.use(
    cors({
      origin: "*",
    })
  );
dotenv.config();
app.use(express.json());

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

const server = app.listen(PORT,console.log("server is running on 5000"));

app.use(cors());
const io = require("socket.io")(server,{
  cors:{
    origin:"*",
  },
  pingTimeout: 60000,
});

io.on("connection", (socket) => {
  socket.on("setup",(user) => {
    socket.join(user.data._id);
      socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  })
  

  socket.on("newMessage", (newMessageStatus) => {
    console.log(newMessageStatus)
    var chat = newMessageStatus.chat;
    if(!chat.users){
      return console.log("chat.user not defined")
    }
    chat.users.forEach((user) => {
      if(user._id == newMessageStatus.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved)
    })
  })
})