import React from 'react'
import "./Message.css"

const MessageSelf = (props) => {
    // var props2 ={name:"you", message:"message self"}
  return (
    <div className='m_self_container'>
        <div className="messagebox">
          {/* {console.log(props.props.content)}   */}
            <p className='conversation_last_message'>{props.props.content}</p>
            <div className="timeright">
            {/* <p className='self_timestamp' >12:00</p> */}
            </div>
        </div>
    </div>
  )
}

export default MessageSelf