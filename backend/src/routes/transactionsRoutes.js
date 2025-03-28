const express = require("express");
const {
    getInventoryTransactions,
    getFactoryOrders,
    getInventoryTransactionsByManagerID,
    addInventoryTransaction
} = require("../controllers/transactionsController");

const router = express.Router();


router.get("/fetch-inventory-transactions", getInventoryTransactions);
router.get("/fetch-factory-orders", getFactoryOrders);
router.get("/fetch-inventory-transactions-by-manager-id", getInventoryTransactionsByManagerID);
router.post("/add-inventory-transaction", addInventoryTransaction);

module.exports = router;