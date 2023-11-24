import React from 'react'
import "./ConversationItem.css"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';


const ConversationItem = ({props}) => {
  
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  const lightTheme = useSelector((state) => state.themeKey)
  // console.log(userData)
  // console.log(props)
  let naam;
  {if (props.users[1].name === userData.data.name){
  naam = props.users[0].name;
  }
  else {
  naam = props.users[1].name;
  }}
  

  return (
    <div className={"container" + (lightTheme?"":" dark")} onClick={()=>{navigate('chat/' + props._id + '&' +props.users[1])}}>
        <p className="icon">{naam[0].toUpperCase()}</p>
        <p className={"title" + (lightTheme?"":" dark")}>{naam}</p>
        <p className={"lastmessage" + (lightTheme?"":" dark")}>{props.lastMessage}</p>
        <p className={"timestamp" + (lightTheme?"":" dark")}>{props.timestamp}</p>
    </div>
  )
}

export default ConversationItem