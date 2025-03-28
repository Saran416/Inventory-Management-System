const express = require("express");
const {
    getBrandsVsSales,
    getMostSoldProducts
} = require("../controllers/dataController");

const router = express.Router();

router.get("/brands-vs-sales", getBrandsVsSales);
router.get("/most-sold-products", getMostSoldProducts);

module.exports = router;