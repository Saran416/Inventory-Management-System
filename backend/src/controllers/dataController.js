const pool = require("../config/db");

exports.getBrandsVsSales = async (req, res) => {
  try {
    let query = `
      SELECT 
        p.brand_name AS Brand,
        SUM(s.quantity * p.price) AS Total_Sales_Amount
      FROM sales s
      JOIN product p ON s.product_ID = p.product_ID
      GROUP BY p.brand_name
      ORDER BY Total_Sales_Amount DESC
      LIMIT 5;
    `;

    const [result] = await pool.query(query);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

exports.getMostSoldProducts = async (req, res) => {
  try {
    let query = `
      SELECT 
        p.name AS Product,
        SUM(s.quantity) AS Total_Quantity_Sold
      FROM sales s
      JOIN product p ON s.product_ID = p.product_ID
      GROUP BY p.name
      ORDER BY Total_Quantity_Sold DESC
      LIMIT 5;
    `;

    const [result] = await pool.query(query);
    res.json({ success: true, data: result });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}