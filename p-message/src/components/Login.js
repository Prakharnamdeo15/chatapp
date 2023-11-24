import React, { useState } from 'react'
import "./Login.css"
import logo from "../images/pngwing.com.png"
import {Button, TextField,Backdrop,CircularProgress} from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import { Navigate } from 'react-router-dom'


const Login = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({name:"",email:"",password:""});
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [loginStatus, setLoginStatus] = React.useState("");
  
  //login
  const loginHandler = async() => {
    setLoading(true);
    try {
      const config = {
        headers:{
          "Content-type":"application/json"
        }
      }

      const response  = await axios.post("http://localhost:5000/user/login",data,config);
      console.log(response);
      setLoginStatus({msg:"success",key:Math.random()});
      setLoading(false);
      localStorage.setItem("userData",JSON.stringify(response));
      // console.log(response)
      navigate("/app/welcome")
    } 
    catch (error) {
      console.log(error.response.data);
      setError(error.response.data);

    }
    setLoading(false);
    
  }


  return (
  <>
  <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loading}
>
  <CircularProgress color="inherit" />
</Backdrop>
    <div className='login_container'>
        <div className="image_container">
            <img src={logo} alt="images load nhi hua" className='login_image' />
        </div>
        <div className="login_box">
            <p className='login_text'>Login to New World !</p>
            <TextField id="standard-basic" label="Enter user name" variant="outlined" onChange={e => data.name = e.target.value }/>
            <TextField id="outlined-password-input" label="password" type='password' autoComplete='current-password' onChange={e => data.password = e.target.value }/>
            <Button variant="outlined" onClick={loginHandler}>Login</Button>
            <p className='error'>{error}</p>

            <p>Don't have an account ? <Link to={'/signup'}>Signup</Link> </p>
        </div>

    </div>
    </>
  )
}

export default Login