const pool = require("../config/db");

exports.getUserPosition = async (req, res) => {
  const username = req.params.username;
//   const result = await pool.query("SELECT  position FROM Employees WHERE username = $1", [username]);
  // use asynch await to get the sql query result

  if (result.rows.length === 0) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  const position = result.rows[0].position;

  res.json({ success: true, position: position });
};
