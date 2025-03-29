const express = require("express");
const {
    getInventoryTransactions,
    getFactoryOrders,
    getInventoryTransactionsByStoreManagerID,
    getInventoryTransactionsByWarehouseManagerID,
    addInventoryTransaction,
    markTransactionAsCompleted,
    markTransactionAsAccepted
} = require("../controllers/transactionsController");

const router = express.Router();


router.get("/fetch-inventory-transactions", getInventoryTransactions);
router.get("/fetch-factory-orders", getFactoryOrders);
router.get("/fetch-inventory-transactions-by-store-manager-id", getInventoryTransactionsByStoreManagerID);
router.get("/fetch-inventory-transactions-by-warehouse-manager-id", getInventoryTransactionsByWarehouseManagerID);
router.post("/add-inventory-transaction", addInventoryTransaction);
router.post("/mark-transaction-as-completed", markTransactionAsCompleted);
router.post("/mark-transaction-as-accepted", markTransactionAsAccepted);

module.exports = router;