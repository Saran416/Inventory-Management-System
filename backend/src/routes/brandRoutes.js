const express = require("express");
const {
    getBrands,
    addBrand,
    deleteBrand
} = require("../controllers/brandController");

const router = express.Router();


router.get("/fetch-brands", getBrands);
router.post("/add-brand", addBrand);
router.delete("/delete-brand", deleteBrand);

module.exports = router;