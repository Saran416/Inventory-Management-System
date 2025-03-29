const express = require("express");
const {
    getInventoryTransactions,
    getFactoryOrders,
    getInventoryTransactionsByStoreManagerID,
    getInventoryTransactionsByWarehouseManagerID,
    addInventoryTransaction,
    markTransactionAsComplete
} = require("../controllers/transactionsController");

const router = express.Router();


router.get("/fetch-inventory-transactions", getInventoryTransactions);
router.get("/fetch-factory-orders", getFactoryOrders);
router.get("/fetch-inventory-transactions-by-store-manager-id", getInventoryTransactionsByStoreManagerID);
router.get("/fetch-inventory-transactions-by-warehouse-manager-id", getInventoryTransactionsByWarehouseManagerID);
router.post("/add-inventory-transaction", addInventoryTransaction);
router.post("/mark-transaction-as-complete", markTransactionAsComplete);

module.exports = router;