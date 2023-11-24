const express = require("express");
const cors = require('cors');
const protect  = require("../middleWare/authMiddleWare");

const router = express.Router();
router.use(cors({
    origin:'*'
}));

const {
    accessChat,
  fetchChats,
  createGroupChat,
  groupExit,
  fetchGroups,
} = require("../controllers/chatController");

// console.log(accessChat);
router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/createGroup").post(protect, createGroupChat);
router.route("/fetchGroups").get(protect, fetchGroups);
router.route("/groupExit").put(protect, groupExit);

module.exports = router;