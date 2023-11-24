import React from 'react'
import "./Message.css"
const MessageOther =(props) => {
    // var props1 = {name:"user 1" ,message:"this is message 1"}
  return (
    <div className='m_other_container'>
     {/* { console.log(props)} */}
            <p className='icon'>{props.props.message.sender.name[0].toUpperCase()}</p>
        <div className="conversation_container">
            <div className="other_text_content">
                <p className="conversation_title">{props.props.message.sender.name}</p>
                <p className="conversation_last_message">{props.props.message.content}</p>
                <div className="timeright">
                </div>
            </div>
        </div>
    </div>
  )
}

export default MessageOther