const express = require("express");
const {
    getStock,
    getStockByEmployeeID
} = require("../controllers/stockController");

const router = express.Router();


router.get("/fetch-stock", getStock);
router.get("/fetch-stock-by-employee-id", getStockByEmployeeID);

module.exports = router;