const jwt = require("jsonwebtoken");
const User = require("../modals/userModel")
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async(req,res,next) => {
    let token;
    let id;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            
            token = req.headers.authorization.split(" ")[1]
            // console.log(req._id)
            // const decoded = jwt.verify(token,process.env.JWT_SECRET);

            // console.log(process.env.JWT_SECRET)
            // console.log(decoded)
            id = req.headers.uid;
            // console.log(req.headers)
            req.user = await User.findById(id).select("-password");
            // console.log(req.user._id)
            next();
            
        } catch (error) {
            console.log(error)
            // throw new Error("Not authorized, token failed")
        }
    }
    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
      }
    
})

module.exports = protect;