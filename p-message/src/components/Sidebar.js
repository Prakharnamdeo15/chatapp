import React,{useContext, useEffect, useState} from 'react'
import "./Sidebar.css"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightlightIcon from '@mui/icons-material/Nightlight';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';
import ConversationItem from './ConversationItem';
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../features/themeSlice';
import { refreshSidebarFun } from "../features/refreshSidebar";
import { myContext } from "./Maincontainer";
import axios from 'axios';

const Sidebar = () => {
    const { refresh, setRefresh } = useContext(myContext);
//   console.log("Context API : refresh : ", refresh);
    const navigate = useNavigate();
    
    const dispatch = useDispatch();
    const lightTheme = useSelector((state) => state.themeKey)

    const userData = JSON.parse(localStorage.getItem("userData"));
    if (!userData) {
        console.log("User not Authenticated");
        navigate("/");
      }
// eslint-disable-next-line
    const [conversations, setConversations] = useState([ ]);

    const user = userData.data;
    // console.log(userData)

    useEffect(() => {
    //   console.log(user._id)
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
          Uid:`${user._id}`
                },
      };
      axios.get("http://localhost:5000/chat/", config).then((response) => {
        // console.log("Data refresh in sidebar ", response.data);
        setConversations(response.data);
        // console.log(response.data);
        // setRefresh(!refresh);
        // console.log(response.data)
      });
    }, [refresh]);

    return (
        <div className='sidebar-container'>
            <div className={"header" + (lightTheme?"":" dark")}>
                <div>
                    <IconButton className={"" + (lightTheme?"":" dark")}>
                        <AccountCircleIcon />
                    </IconButton>
                </div>
                <div>
                    <IconButton onClick={()=>{navigate('users')}} className={"" + (lightTheme?"":" dark")}>
                        <PersonAddIcon />
                    </IconButton>
                    <IconButton onClick={()=>{navigate('create-group')}} className={"" + (lightTheme?"":" dark")}>
                        <GroupAddIcon />
                    </IconButton>
                    <IconButton className={"" + (lightTheme?"":" dark")}>
                        <AddCircleIcon />
                    </IconButton>
                    <IconButton onClick={() => {dispatch(toggleTheme())}} className={"" + (lightTheme?"":" dark")}>
                        {lightTheme && <NightlightIcon />}          
                        {!lightTheme && <LightModeIcon/>}
                    </IconButton>
                </div>
            </div>
            <div className={"search" + (lightTheme?"":" dark")}>
                <div className={"search_container" + (lightTheme?"":" dark")}>
                    <IconButton className={"" + (lightTheme?"":" dark")}>
                    <SearchIcon/>
                    </IconButton>
                <input className={"search_box" + (lightTheme?"":" dark")} type="text" placeholder='Search' />
                </div>
            </div>
            <div className={"conversation" + (lightTheme?"":" dark")}>
                {
                conversations.map((conversation,index) => {
                    // console.log(conversation)
                    return <ConversationItem props={conversation} key={index} />
                })
                }
            </div>
        </div>
    )
}

export default Sidebar