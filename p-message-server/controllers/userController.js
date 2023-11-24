const express = require("express");
const User = require("../modals/userModel");
const generateToken = require("../config/generateToken");
const expressAsyncHandler = require("express-async-handler");
// const { check, validationResult } = require('express-validator');


//login handler
const loginController = async (req,res) => {
    const {name,password} = req.body;
try{
    const user = await User.findOne({name});
    // console.log(await user.matchPassword(password))
    if(user && (await user.matchPassword(password))){
        res.json({
            _id: user._id.valueOf(),
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id.valueOf())
        })
    }
    else{
        res.status(401).send("enter valid credentials")
        throw new Error("enter valid credentials")
    }
}
catch(error){
    console.error(error);
    res.send(error.mesage);
}}

//signup handler 
const registerController = async(req,res) => {
    const {name,email,password} = req.body;

    //checking all fields
try{
    if(!name || !email ||!password){
        res.status(400).send("All fields are mandatory");
        throw Error("All fields are mandatory")
    }

    //pre existing user

    const userExist  =  await User.findOne({email});
   if(userExist){
        res.send("User already exists")
        throw new Error("User already exists");
    }

    //username taken 

    const userNameExist  =  await User.findOne({name});
    if(userNameExist){
        res.send('username already taken');
        throw new Error("Username already taken");
    }

    //checking valid email
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };

    if(!validateEmail(email)){
        res.status(501).send('enter valid email address');
        throw new Error("email is not valid"); 
    }

    //creating new user

    const user = await User.create ({name,email,password});
    if(user){
       
        res.json({
            _id: user._id.valueOf(),
            name:user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            token:generateToken(user._id.valueOf())
        })
    }
    else{
        res.status(400).send("Registration error")
        throw new Error("Registration error")
    }}
    catch(error){
        console.error(error);
        res.send(error.mesage)
    }
}

const fetchAllUsersController  = expressAsyncHandler(async(req,res)=>{
//    try{ const keyword = req.query.search ? {
//         $or:[
//             {name:{$regex: req.query.search,$options:"i"}},
//             {email:{$regex: req.query.search,$options:"i"}}
//         ]
//     }:{};
//  console.log(req.query.search)
//     const users = await User.find(keyword).find({
//         _id: {$ne:req.user._id},
//     })
//     res.send(users);}catch(error){console.log(error)}

const keyword = req.query.search
? {
    $or: [
      { name: { $regex: req.query.search, $options: "i" } },
      { email: { $regex: req.query.search, $options: "i" } },
    ],
  }
: {};
// console.log(req.user)

const users = await User.find(keyword).find({
            _id: {$ne:req.user._id},
        })
        res.send(users);

})

module.exports = {loginController,registerController,fetchAllUsersController};