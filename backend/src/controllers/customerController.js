const pool = require("../config/db");

exports.getCustomer = async (req, res) => {
  const { customer_name } = req.query;


  try {
    let query = `
      SELECT * FROM customer as c
    `;

    let conditions = [];
    let queryParams = [];


    if (customer_name) {
      conditions.push(`c.customer_name LIKE ?`);
      queryParams.push(`%${customer_name}%`);
    }


    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    const [result] = await pool.query(query, queryParams);

    res.json({ success: true, sales: result });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
  