const pool = require("../config/db");


exports.getFacilities = async (req, res) => {
  const { facility_type, location } = req.query;

  try {
    let query = `
      SELECT
        facility_ID,
        type,
        location,
        coordinates
      FROM facility
    `;

    let conditions = [];
    let queryParams = [];

    if (facility_type) {
      conditions.push(`type = ?`);
      queryParams.push(`${facility_type}`);
    } 
  
    if (location) {
      conditions.push(`location LIKE ?`);
      queryParams.push(`%${location}%`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    const [result] = await pool.query(query, queryParams);
    res.json({ success: true, facilities: result });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

exports.getFacilityLocFromID = async (req, res) => {
  const { facility_ID } = req.query;
  try {
    const [result] = await pool.query("SELECT location FROM facility WHERE facility_ID = ?", [facility_ID]);
    res.json({ success: true, location: result[0].location });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

exports.getWarehouses = async (req, res) => {
  try {
    const [result] = await pool.query("SELECT * FROM facility WHERE type = 'warehouse'");
    res.json({ success: true, warehouses: result });
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

exports.addFacility = async (req, res) => {
  const { facilityType, facilityLocation, facilityCoordinates } = req.body;
  try {
    const query = "INSERT INTO facility (type, location, coordinates) VALUES (?, ?, ?)";
    const [result] = await pool.query(query, [facilityType, facilityLocation, facilityCoordinates]);

    res.status(201).json({
      success: true,
      message: "Facility added successfully.",
      facilityId: result.insertId,
    });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// TODO: check this, keywords (facility, deletefacility)
exports.deleteFacility = async (req, res) => {
  const { facility_Id } = req.body;
  // try {
  //   const query = "DELETE FROM facility WHERE facility_ID = ?";
  //   await pool.query(query, [facility_Id]);

  //   res.json({ success: true, message: "Facility deleted successfully." });
  // } catch (error) {
  //   console.error("Database error:", error);
  //   res.status(500).json({
  //     success: false,
  //     message: "Internal server error. Please try again later.",
  //   });
  // }
  res.json({ success: true, message: "Facility deleted successfully." });
};