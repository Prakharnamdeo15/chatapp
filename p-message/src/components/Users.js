import React, { useEffect, useState } from 'react'
import "./Users.css"
import logo from "../images/pngwing.com.png"
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material'
import {AnimatePresence,motion} from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux"; 
import { myContext } from "./Maincontainer";
import { refreshSidebarFun } from "../features/refreshSidebar";


const Users_group = () => {

  const lightTheme = useSelector((hello) => hello.themeKey)
  const [users, setUsers] = useState([]);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();
  if(!userData  ){
    console.log("aur hacker bhai kya haal");
    navigate(-1);
  }

  const dispatch = useDispatch();

  useEffect(() => {
    // console.log(userData.data._id);

    const config = {
      
      headers:{
        Authorization:`Bearer ${userData.data.token}`,
        Uid:`${userData.data._id}`
        // "Content-Type":"application/json"
        
      }
    };
    axios.get("http://localhost:5000/user/fetchUsers",config).then((data)=>{setUsers(data.data)})
  })
// console.log(users)
  return (
    <AnimatePresence>
    <motion.div 
    initial={{opacity:0,scale:0}}
    animate={{opacity:1,scale:1}}
    exit={{opacity:0,scale:0}}
    transition={{ease:"anticipate",duration:"0.3"}}
    className='list_container'>
      <div className={"ug_header" + (lightTheme?"":" dark")}>
        <img src={logo} alt="" style={{ height: "2rem", width: "2rem" }} />
        <p className={"ug_title" + (lightTheme?"":" dark")}>online users</p>
      </div>
      <div className={"ug_search" + (lightTheme?"":" dark")}>
        <IconButton className={"" + (lightTheme?"":" dark")}>
          <SearchIcon />
        </IconButton>
        <input type="text" placeholder='search' className={"ug_searchbar" + (lightTheme?"":" dark")} />
      </div>
      <div className="ug_list">
        {
          users.map((user,index) => {
            return(
              <div className="list_item"  onClick={() => {
                console.log("Creating chat with ", user.name);
                const config = {
                  headers: {
                    Authorization: `Bearer ${userData.data.token}`,
                    Uid:`${userData.data._id}`

                  },
                };
                axios.post(
                  "http://localhost:5000/chat/",
                  {
                    userId: user._id,
                  },
                  config
                );
                dispatch(refreshSidebarFun());
              }}>

          <p className="ug_icon">{user.name[0].toUpperCase()}</p>
          <p className="ug_title">{user.name}</p>
        </div>
            )
          })
        }
        {/* <div className="list_item">
          <p className="ug_icon">T</p>
          <p className="ug_title">test user</p>
        </div>
        <div className="list_item">
          <p className="ug_icon">T</p>
          <p className="ug_title">test user</p>
        </div> */}
      </div>
    </motion.div>
    </AnimatePresence>
  )
}

export default Users_group