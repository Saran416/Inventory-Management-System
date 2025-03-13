const express = require("express");
const { getUserPosition, employeeExists, addEmployee } = require("../controllers/userController");

const router = express.Router();

// router.get("/user/:username", getUserInfo);
router.get("/user-position", getUserPosition);
router.get("/employee-exists", employeeExists);
router.post("/add-employee", addEmployee);


module.exports = router;
