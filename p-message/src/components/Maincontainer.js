import React, { createContext, useState } from "react";
import "./Maincontainer.css"
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";

export const myContext = createContext();

const Maincontainer = () => {
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(true);
  return (
    <div className='maincontainer' >
            <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
        <Sidebar/>
        <Outlet/>
        </myContext.Provider>
        {/* <Welcomecontainer/> */}
        {/* <Chatarea/> */}
        {/* <Creategroup/> */}  
    </div>
  )
}

export default Maincontainer