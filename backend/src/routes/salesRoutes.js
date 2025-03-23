const express = require("express");
const {
    getSales
} = require("../controllers/salesController");

const router = express.Router();


router.get("/fetch-sales", getSales);

module.exports = router;