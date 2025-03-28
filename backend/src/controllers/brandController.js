const pool = require("../config/db");

exports.getBrandNames = async(req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT brand_name FROM brand"
    );
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

exports.getBrands = async(req, res) => {
  const { brand_name } = req.query;

  try {
    let query = `
      SELECT 
        brand_name, 
        contact_info
      FROM brand
    `;

    let conditions = [];
    let queryParams = [];

    if (brand_name) {
      conditions.push(`brand_name LIKE ?`);
      queryParams.push(`%${brand_name}%`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    const [result] = await pool.query(query, queryParams);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
      
  }
};

exports.addBrand = async(req, res) => {
  const { brand_name, contact_info } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO brand (brand_name, contact_info) VALUES (?, ?)",
      [brand_name, contact_info]
    );

    res.json({ success: true, message: "Brand added successfully." });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

exports.deleteBrand = async(req, res) => {
  const { brand_name } = req.body;

  // try {
  //   const [result] = await pool.query(
  //     "DELETE FROM brand WHERE brand_name = ?",
  //     [brand_name]
  //   );

  //   res.json({ success: true, message: "Brand deleted successfully." });
  // } catch (error) {
  //   console.error("Database error:", error);
  //   res.status(500).json({
  //     success: false,
  //     message: "Internal server error. Please try again later.",
  //   });
  // }
  res.json({ success: true, message: "This feature is not yet implemented." });
}