const pool = require("../config/db");
const bcrypt = require("bcryptjs");

// TODO: check all these function
exports.getAllFacilities = async (req, res) => {
  try {
    // const result = await pool.query("SELECT * FROM facility");
    // res.json({ success: true, facilities: result.rows.location });
    res.json({ success: true, facilities: [] });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

exports.getWarehouseLocations = async (req, res) => {
  try {
    // const result = await pool.query("SELECT * FROM facility WHERE type = 'warehouse'");
    // const locations = result.rows.map(row => row.location);
    // res.json({ success: true, locations });
    // res.json({ success: true, locations: [] });
    const dummyLocations = ["warehouse location1", "warehouse location2", "warehouse location3"];
    res.json({ success: true, locations: dummyLocations });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

exports.getStoreLocations = async (req, res) => {
  try {
    // const result = await pool.query("SELECT * FROM facility WHERE type = 'store'");
    // const locations = result.rows.map(row => row.location);
    // res.json({ success: true, locations });
    // res.json({ success: true, locations: [] });
    const dummyLocations = ["store location1", "store location2", "store location3"];
    res.json({ success: true, locations: dummyLocations });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

