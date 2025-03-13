const pool = require("../config/db");

exports.getUserPosition = async (req, res) => {
  const username = req.params.username;
  const result = await pool.query("SELECT  position FROM Employees WHERE username = $1", [username]);

  if (result.rows.length === 0) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  const position = result.rows[0].position;

  res.json({ success: true, position: position });
};

exports.addEmployee = async (req, res) => {
  const { username, password, position } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query("INSERT INTO Employees (username, password, position) VALUES ($1, $2, $3)", [username, hashedPassword, position]);

    res.json({ success: true });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
