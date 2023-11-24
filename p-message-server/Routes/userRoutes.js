const express = require('express');
const { loginController, registerController,fetchAllUsersController } = require('../controllers/userController');
const cors = require('cors');
const protect = require('../middleWare/authMiddleWare');



const Router = express.Router();
Router.use(cors());

Router.post("/login",loginController);
Router.post("/register",registerController);
Router.get("/fetchUsers",protect,fetchAllUsersController)

module.exports = Router;