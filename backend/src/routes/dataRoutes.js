const express = require("express");
const {
    getBrandsVsSales,
    getMostSoldProducts,
    getBusiestStores,
} = require("../controllers/dataController");

const router = express.Router();

router.get("/brands-vs-sales", getBrandsVsSales);
router.get("/most-sold-products", getMostSoldProducts);
router.get("/busiest-stores", getBusiestStores);

module.exports = router;