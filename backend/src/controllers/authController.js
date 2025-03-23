const pool = require("../config/db");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { employee_name, password } = req.body;

  try {
    const [rows] = await pool.query(
      "SELECT password, position FROM employee WHERE employee_name = ?",
      [employee_name]
    );
    
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid username" });
    }

    const storedPassword = rows[0].password;
    const position = rows[0].position;

    const passwordMatch = await bcrypt.compare(password, storedPassword);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }


    res.json({ success: true, position });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

