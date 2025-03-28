const express = require("express");
const { 
    getCategories
} = require("../controllers/categoryController");

const router = express.Router();

router.get("/fetch-categories", getCategories);


module.exports = router;
