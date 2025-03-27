const pool = require("../config/db");

exports.getStock = async (req, res) => {
  const { location, product_name } = req.query;


  try {
    let query = `
      SELECT 
        p.name AS product_name,
        f.location AS facility_location,
        s.quantity,
        s.reorder_level
      FROM stock s
      JOIN product p ON s.product_ID = p.product_ID
      JOIN facility f ON s.facility_ID = f.facility_ID
    `;

    // Array to store conditions
    let conditions = [];
    let queryParams = [];

    // Add conditions dynamically
    if (location) {
      conditions.push(`f.location LIKE ?`);
      queryParams.push(`%${location}%`);
    }

    if (product_name) {
      conditions.push(`p.name LIKE ?`);
      queryParams.push(`%${product_name}%`);
    }


    // Add conditions to the query if any
    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    // console.log(query);
    // console.log(queryParams);

    // Execute parameterized query
    const [result] = await pool.query(query, queryParams);

    // console.log(result);
    res.json({ success: true, sales: result });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
  