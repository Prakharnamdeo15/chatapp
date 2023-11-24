import React,{useContext, useEffect, useState} from 'react'
import "./Chatarea.css"
import Header from './Header';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import MessageOther from './MessageOther';
import MessageSelf from './MessageSelf';
import { useSelector } from 'react-redux';
import {AnimatePresence,motion} from 'framer-motion';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { myContext } from "./Maincontainer";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";

var socket;
const Chatarea = () => {
  // eslint-disable-next-line
  const lightTheme = useSelector((state) => state.themeKey)
  const userData = JSON.parse(localStorage.getItem("userData"));
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split("&");
  const [messageContent, setMessageContent] = useState("");

  const [allMessages, setAllMessages] = useState([]);
  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setloaded] = useState(false);
  const [socketConnectionStatus, setSocketConnectionStatus] = useState(false);

  const [chatWith, setchatWith] = useState({
    name:"",
    lastMessage:"",
    timestamp:""
})

const sendMessage = () => {

  const user = userData.data;
  console.log(user)
  var data;

  // console.log("SendMessage Fired to", chat_id._id);
  const config = {
    headers: {
      Authorization: `Bearer ${userData.data.token}`,
      Uid:`${user._id}`
    },
  };
  axios
    .post(
      "http://localhost:5000/message/",
      {
        content: messageContent,
        chatId: chat_id,
      },
      config
    )
    .then(({ response }) => {
      data = response;
      // console.log(response);
    });
    // socket.emit("newMessage",data);
};

//connect to socket
useEffect(() => {
  socket = io(ENDPOINT);
  socket.emit("setup",userData);
  socket.on("connection",()=>{
    setSocketConnectionStatus(!socketConnectionStatus);
  })
},[]);

useEffect(() => {
  // console.log("Users refreshed");
  const config = {
    headers: {
      Authorization: `Bearer ${userData.data.token}`,
    },
  };
  axios
    .get("http://localhost:5000/message/" + chat_id, config)
    .then(({ data }) => {
      console.log(data)
      setAllMessages(data.data);
      setchatWith({
        name:`${data.reciever}`,
        lastMessage:'',
        timestamp:''
      })
    //   setchatWith((prevState) => ({ 
    //     name:`${}`,
    //     lastMessage:"",
    //     timestamp:""
    //  }))
      setloaded(true);
      // console.log("Data from Acess Chat API ", data);
    });
  // scrollToBottom();
}, [refresh, chat_id, userData.data.token]);


  return (
    <AnimatePresence>
    <motion.div 
    initial={{opacity:0,scale:0}}
    animate={{opacity:1,scale:1}}
    exit={{opacity:0,scale:0}}
    transition={{ease:"anticipate",duration:"0.3"}}
    className="chatarea_container">
      <div className={"chatarea_header"}>
        <Header props={chatWith}/>
      </div>
      <div className={"message_container" + (lightTheme?"":" dark")}>
        {allMessages
            .slice(0)
            // .reverse()
            .map((message, index) => {
              // console.log(message)
              const sender = message.sender;
              const self_id = userData.data._id;
              if (sender._id === self_id) {
                // console.log("I sent it ");
                return <MessageSelf props={message} key={index} />;
              } else {
                // console.log("Someone Sent it");
                return <MessageOther props={{message}} key={index} />;
              }
            })}


      </div>
      <div className={"text_input" + (lightTheme?"":" dark")}>
        <input className={"text_in" + (lightTheme?"":" dark")} placeholder="Type a message ..." type="text" value={messageContent}  onChange={(e) => {
              setMessageContent(e.target.value);
            }}   onKeyDown={(event) => {
              if (event.code == "Enter") {
                // console.log(event);
                sendMessage();
                setMessageContent("");
                setRefresh(!refresh);
              }
            }}/>
        <IconButton className={"" + (lightTheme?"":" dark")}>
        <SendIcon/>
        </IconButton>
      </div>
    </motion.div>
    </AnimatePresence>
  )
}

export default Chatarea;