const express = require("express");
const {
    getBrandsVsSales,
    getMostSoldProducts,
    getBusiestStores,
    getSales6Months,
} = require("../controllers/dataController");

const router = express.Router();

router.get("/brands-vs-sales", getBrandsVsSales);
router.get("/most-sold-products", getMostSoldProducts);
router.get("/busiest-stores", getBusiestStores);
router.get("/sales-6-months", getSales6Months);


module.exports = router;