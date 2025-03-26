const express = require("express");
const {
    getCustomer
} = require("../controllers/customerController");

const router = express.Router();


router.get("/fetch-customers", getCustomer);

module.exports = router;