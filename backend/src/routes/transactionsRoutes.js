const express = require("express");
const {
    getInventoryTransactions,
    getFactoryOrders,
    getInventoryTransactionsByStoreManagerID,
    addInventoryTransaction
} = require("../controllers/transactionsController");

const router = express.Router();


router.get("/fetch-inventory-transactions", getInventoryTransactions);
router.get("/fetch-factory-orders", getFactoryOrders);
router.get("/fetch-inventory-transactions-by-store-manager-id", getInventoryTransactionsByStoreManagerID);
router.post("/add-inventory-transaction", addInventoryTransaction);

module.exports = router;