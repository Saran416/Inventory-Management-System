const express = require("express");
const {
    getSales,
    addSale
} = require("../controllers/salesController");

const router = express.Router();


router.get("/fetch-sales", getSales);
router.post("/add-sale", addSale);

module.exports = router;