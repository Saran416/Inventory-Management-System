const express = require("express");
const {
    getInventoryTransactions,
    getFactoryOrders,
} = require("../controllers/transactionsController");

const router = express.Router();


router.get("/fetch-inventory-transactions", getInventoryTransactions);
router.get("/fetch-factory-orders", getFactoryOrders);

module.exports = router;