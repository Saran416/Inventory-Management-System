const express = require("express");
const { login, addEmployee } = require("../controllers/authController");

const router = express.Router();

router.post("/login", login);
router.post("/add-employee", addEmployee);


module.exports = router;
