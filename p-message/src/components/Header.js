import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import "./Header.css"
import { useSelector } from 'react-redux';

const Header = ({props}) => {

  const lightTheme = useSelector((state) => state.themeKey)

  return (
    <div className={"header_container" + (lightTheme?"":" dark")}>
        <div className="icon">{props.name[0]}</div>
        <div className={"header_text" + (lightTheme?"":" dark")}>
        <div className={"name" + (lightTheme?"":" dark")}>{props.name}</div>
        <div className={"timestamp" + (lightTheme?"":" dark")}>{props.timestamp}</div>
        </div>
        <div className="del_button">
            <IconButton className={"" + (lightTheme?"":" dark")}>
            <DeleteIcon/>
            </IconButton>
        </div>
    </div>
  )
}

export default Header