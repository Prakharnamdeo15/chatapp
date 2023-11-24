import React from 'react'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { IconButton } from '@mui/material';
import "./Creategroup.css"
import { useSelector } from 'react-redux';
import {AnimatePresence,motion} from 'framer-motion';

const Creategroup = () => {

    const lightTheme = useSelector((state) => state.themeKey)

    return (
        <AnimatePresence>
        <motion.div 
         initial={{opacity:0,scale:0}}
         animate={{opacity:1,scale:1}}
         exit={{opacity:0,scale:0}}
         transition={{ease:"anticipate",duration:"0.3"}}
        className={"creategroup_container" + (lightTheme?"":" dark")}>
            <input type="text" placeholder='Enter group name here' className={"search_box groupname" + (lightTheme?"":" dark")} />
            <IconButton className={"" + (lightTheme?"":" dark")}>
                <DoneOutlineIcon />
            </IconButton>
        </motion.div>
        </AnimatePresence>
    )
}

export default Creategroup