const express = require("express");
const {
    getStock
} = require("../controllers/stockController");

const router = express.Router();


router.get("/fetch-stock", getStock);

module.exports = router;