import React from 'react'
import "./Welcomecontainer.css"
import logo from "../images/pngwing.com.png"
import {AnimatePresence,motion} from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Welcomecontainer = () => {

  const userData = JSON.parse(localStorage.getItem("userData"))
  // console.log(userData);
  const navigate = useNavigate();
  if(!userData){
    navigate("/");
  }
  return (
    <AnimatePresence>
    <motion.div 
     initial={{opacity:0,scale:0}}
     animate={{opacity:1,scale:1}}
     exit={{opacity:0,scale:0}}
     transition={{ease:"anticipate",duration:"0.3"}}
    className='welcomecontainer'>
        <img src={logo} alt="" className='welcome_logo'/>
        <p className='welcome_text'>welcome to the New World !!</p>
    </motion.div>
    </AnimatePresence>
  )
}

export default Welcomecontainer