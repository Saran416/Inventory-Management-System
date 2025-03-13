const pool = require("../config/db");
const bcrypt = require("bcryptjs");


exports.getUserPosition = async (req, res) => {
  const { username } = req.query;
  const result = await pool.query("SELECT  position FROM employees WHERE username = $1", [username]);

  if (result.rows.length === 0) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  const position = result.rows[0].position;

  res.json({ success: true, position: position });
};

exports.employeeExists = async (req, res) => {
  const { username } = req.query;

  const result = await pool.query("SELECT username FROM employees WHERE username = $1", [username]);

  if (result.rows.length === 0) {
    return res.json({ success: false, message: "Employee does not exist" });
  }

  res.json({ success: true, message: "Employee exists" });
}

exports.addEmployee = async (req, res) => {
  const { username, password, position } = req.body;

  try {
    const existingUser = await pool.query("SELECT username FROM employees WHERE username = $1", [username]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ success: false, message: "Employee with this username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO employees (username, password, position) VALUES ($1, $2, $3)", 
      [username, hashedPassword, position]
    );

    res.json({ success: true, message: "Employee added successfully" });
  } catch (error) {
    console.error("Database error:", error);

    // Return a more specific error message
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });

  }
}
