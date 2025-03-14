const pool = require("../config/db");
const bcrypt = require("bcryptjs");


exports.getEmployeePosition = async (req, res) => {
  const { username } = req.query;
  const result = await pool.query("SELECT  position FROM employee WHERE username = $1", [username]);

  if (result.rows.length === 0) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  const position = result.rows[0].position;

  res.json({ success: true, position: position });
};

exports.employeeExists = async (req, res) => {
  const { username } = req.query;

  const result = await pool.query("SELECT username FROM employee WHERE username = $1", [username]);

  if (result.rows.length === 0) {
    return res.json({ success: false, message: "Employee does not exist" });
  }

  res.json({ success: true, message: "Employee exists" });
}

exports.addAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await pool.query("SELECT username FROM employee WHERE username = $1", [username]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ success: false, message: "Employee with this username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO employee (username, position, password) VALUES ($1, 'admin', $2)", 
      [username, hashedPassword]
    );

    res.json({ success: true, message: "Admin added successfully" });
  } catch (error) {
    console.error("Database error:", error);

    // Return a more specific error message
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });

  }
}

exports.addAuditor = async (req, res) => {
  // add to employee table
  // add to works_in table
  const { username, password } = req.body;
  console.log(username, password);
  res.json({ success: true, message: "Auditor added successfully" });
  // auditor can see store details, warehouse details, employees details, purchases and sales
}

exports.addWarehouseManager = async (req, res) => {
  const { username, warehouse, password } = req.body;
  console.log(username, warehouse, password)
  res.json({ success: true, message: "Warehouse Manager added successfully" });
}

exports.addWarehouseEmployee = async (req, res) => {
  const { username, warehouse, password } = req.body;
  console.log(username, warehouse, password)
  res.json({ success: true, message: "Warehouse Employee added successfully" });
}

exports.addStoreManager = async (req, res) => {
  const { username, store, password } = req.body;
  console.log(username, store, password)
  res.json({ success: true, message: "Store Manager added successfully" });
}

exports.addStoreEmployee = async (req, res) => {
  const { username, store, password } = req.body;
  console.log(username, store, password)
  res.json({ success: true, message: "Store Employee added successfully" });
}


exports.addEmployee = async (req, res) => {
  const { username, password, position } = req.body;

  try {
    const existingUser = await pool.query("SELECT username FROM employee WHERE username = $1", [username]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ success: false, message: "Employee with this username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO employee (username, position, password) VALUES ($1, $2, $3)", 
      [username, position, hashedPassword]
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
