const express = require("express");
const {
  getFacilities,
  getFacilityLocFromID,
  getWarehouses,
  getWarehouseLocations,
  getStoreLocations,
  addFacility,
  deleteFacility,
} = require("../controllers/facilityController");

const router = express.Router();


router.get("/fetch-facilities", getFacilities);
router.get("/fetch-facility-location-from-id", getFacilityLocFromID);
router.get("/fetch-warehouses", getWarehouses);
router.get("/fetch-warehouse-locations", getWarehouseLocations);
router.get("/fetch-store-locations", getStoreLocations);
router.post("/add-facility", addFacility);
router.delete("/delete-facility", deleteFacility);

module.exports = router;