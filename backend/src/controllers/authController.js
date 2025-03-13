const pool = require("../config/db");
const bcrypt = require("bcryptjs");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query("SELECT password, position FROM employees WHERE username = $1", [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid username" });
    }

    const storedPassword = result.rows[0].password;
    const position = result.rows[0].position;

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

