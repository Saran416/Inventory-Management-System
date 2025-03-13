const express = require("express");
const { getUserPosition } = require("../controllers/userController");

const router = express.Router();

// router.get("/user/:username", getUserInfo);
router.get("/user-position/:username", getUserPosition);

module.exports = router;
