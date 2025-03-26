const pool = require("../config/db");

exports.getAllFacilities = async (req, res) => {
  try {
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
    const [result] = await pool.query("SELECT location FROM facility WHERE type = 'warehouse'");
    const locations = result.map((row) => row.location);
    res.json({ success: true, locations });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};


exports.getStoreLocations = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT location FROM facility WHERE type = 'store'");
    const locations = result.map((row) => row.location);
    res.json({ success: true, locations });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};


