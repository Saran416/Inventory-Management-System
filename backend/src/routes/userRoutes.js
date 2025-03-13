const express = require("express");
const { getUserPosition, addEmployee } = require("../controllers/userController");

const router = express.Router();

// router.get("/user/:username", getUserInfo);
router.get("/user-position/:username", getUserPosition);
router.post("/add-employee", addEmployee);


module.exports = router;
