const express = require("express");
const {
    getProducts,
    addProduct,
    deleteProduct,
} = require("../controllers/productController");

const router = express.Router();


router.get("/fetch-products", getProducts);
router.post("/add-product", addProduct);
router.delete("/delete-product", deleteProduct);

module.exports = router;