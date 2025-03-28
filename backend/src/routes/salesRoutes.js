const express = require("express");
const {
    getSales,
    getSalesByEmployeeID,
    addSale
} = require("../controllers/salesController");

const router = express.Router();


router.get("/fetch-sales", getSales);
router.get("/fetch-sales-by-employee-id", getSalesByEmployeeID);
router.post("/add-sale", addSale);

module.exports = router;