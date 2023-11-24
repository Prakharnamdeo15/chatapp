const express = require("express");
const cors = require('cors')
const  protect = require("../middleWare/authMiddleWare");
const {
  // allMessages,
  // sendMessage,
  allMessages, sendMessage
} = require("../controllers/messageController");


const router = express.Router();
router.use(cors({
    origin:'*'
}));
console.log(allMessages)
router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

module.exports = router;