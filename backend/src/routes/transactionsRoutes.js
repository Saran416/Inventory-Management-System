const express = require("express");
const {
    getInventoryTransactions
} = require("../controllers/transactionsController");

const router = express.Router();


router.get("/fetch-inventory-transactions", getInventoryTransactions);

module.exports = router;