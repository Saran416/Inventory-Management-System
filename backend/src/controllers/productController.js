const pool = require("../config/db");

// TODO: Implement the following functions

exports.getProducts = async(req, res) => {
  const { product_name, brand_name } = req.query;
  try {
    let query = `
      SELECT 
        p.product_ID, 
        p.name AS product_name, 
        p.price, 
        c.category_name, 
        b.brand_name
      FROM product p
      JOIN category c ON p.category_ID = c.category_ID
      JOIN brand b ON p.brand_name = b.brand_name
    `;

    let conditions = [];
    let queryParams = [];

    if (product_name) {
      conditions.push(`p.name LIKE ?`);
      queryParams.push(`%${product_name}%`);
    }

    if (brand_name) {
      conditions.push(`b.brand_name LIKE ?`);
      queryParams.push(`%${brand_name}%`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    const [rows] = await pool.query(query, queryParams);
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
  
  // res.json({ success: true, message: "This feature is not yet implemented." });
};

exports.addProduct = async(req, res) => {
  const { name, price, category_ID, brand_name } = req.body;
  try {
    await pool.query(
      "INSERT INTO product (name, price, category_ID, brand_name) VALUES (?, ?, ?, ?)",
      [name, price, category_ID, brand_name]
    );
    res.json({ success: true, message: "Product added successfully." });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }

  // res.json({ success: true, message: "This feature is not yet implemented." });
}

exports.deleteProduct = async(req, res) => {
  res.json({ success: true, message: "This feature is not yet implemented." });
}