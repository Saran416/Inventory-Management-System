const pool = require("../config/db");

exports.getCategories = async(req, res) => {
  try {
    const [result] = await pool.query(
      "SELECT category_ID, category_name FROM category"
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