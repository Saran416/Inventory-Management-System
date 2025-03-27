const express = require("express");
const { 
  getEmployeePosition, 
  getAllEmployees,
  employeeExists, 
  addAdmin, 
  addAuditor, 
  addWarehouseManager, 
  addWarehouseEmployee, 
  addStoreManager, 
  addStoreEmployee,
  deleteEmployee,
  getWorksIn,
} = require("../controllers/employeeController");

const router = express.Router();

// router.get("/user/:username", getUserInfo);
router.get("/employee-position", getEmployeePosition);
router.get("/fetch-all-employees", getAllEmployees);
router.get("/employee-exists", employeeExists);
router.post("/add-admin", addAdmin);
router.post("/add-auditor", addAuditor);
router.post("/add-warehouse-manager", addWarehouseManager);
router.post("/add-warehouse-employee", addWarehouseEmployee);
router.post("/add-store-manager", addStoreManager);
router.post("/add-store-employee", addStoreEmployee);
router.delete("/delete-employee", deleteEmployee);
router.get("/get-works-in", getWorksIn);



module.exports = router;
