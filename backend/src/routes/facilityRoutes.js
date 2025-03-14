const express = require("express");
const {
    getAllFacilities,
    getWarehouseLocations,
    getStoreLocations,
} = require("../controllers/facilityController");

const router = express.Router();


router.get("/fetch-all-facilities", getAllFacilities);
router.get("/fetch-warehouse-locations", getWarehouseLocations);
router.get("/fetch-store-locations", getStoreLocations);

module.exports = router;