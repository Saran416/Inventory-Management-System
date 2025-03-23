const pool = require("../config/db");

exports.getSales = async (req, res) => {
    try {
      const [result] = await pool.query("SELECT * FROM sales ORDER BY date DESC");
      res.json(result);
    } catch (error) {
      console.error("Database error:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error. Please try again later.",
      });
    }
  };
  