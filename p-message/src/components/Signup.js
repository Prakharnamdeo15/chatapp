import React, { useState } from 'react'
import "./Login.css"
import logo from "../images/pngwing.com.png"
import {Button, TextField,Backdrop,CircularProgress,Snackbar,Alert} from "@mui/material"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {
const navigate = useNavigate();

const [data, setData] = useState({name:"",email:"",password:""});
const [loading, setLoading] = useState(false)
const [showAlert, setshowAlert] = useState(false)
const [signupStatus, setSignupStatus] = React.useState("");

  //signup 
  const signupHandler = async() => {
    setLoading(true);
    try {
      const config = {
        headers:{
          "Content-type":"application/json"
        }
      }

      const response  = await axios.post("http://localhost:5000/user/register",data,config);
      console.log(response);
      setSignupStatus({msg:"success",key:Math.random()});
      setshowAlert(true);
      setLoading(false);
      localStorage.setItem("userData",JSON.stringify(response));
      navigate("/app/welcome");
    } 
    catch (error) {
      console.log(error)
      if(error.response.status === 405 || error.response.status === 501){
        setLoading(false)
        setSignupStatus({
            msg:"user with this email already exists or invalid email",
            key:Math.random()
        })
        setshowAlert(true);
      }
    }}

//     const showAlert = () =>{
//         <Alert variant="outlined" severity={alertType}>
// {signupStatus.msg}
// </Alert>
//     }
const close =()=>{
setshowAlert(false)
}

  return (
    <>
<Snackbar
  open={showAlert}
  autoHideDuration={3000}
  onClose={close}
  message={signupStatus.msg}
//   action={action}
/>

    <Backdrop
  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
  open={loading}
>
  <CircularProgress color="inherit" />
</Backdrop>

    <div className='login_container'>
   
    <div className="image_container">
        <img src={logo} alt="load nhi hua" className='login_image' />
    </div>
    <div className="login_box">

        <p className='login_text'>Signup to New World !</p>
        <TextField id="standard-basic" label="Enter user name" variant="outlined" onChange={e => data.name = e.target.value }/>
        <TextField id="standard-basic" label="Email address" variant="outlined" type="email" onChange={e => data.email = e.target.value }/>
        <TextField id="outlined-password-input" label="password" type='password' autoComplete='current-password' onChange={e => data.password = e.target.value }/>
        <Button variant="outlined" onClick={signupHandler}>Signup</Button>
        <p>already have an account ? <Link to='/'>Login</Link></p>
    </div>

</div> 
</> )
}

export default Signup;