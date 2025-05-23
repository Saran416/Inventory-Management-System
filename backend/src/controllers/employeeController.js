const pool = require("../config/db");
const bcrypt = require("bcryptjs");

exports.getEmployeeId = async (req, res) => {
  const { employee_name } = req.query;
  try {
    const [rows] = await pool.query(
      "SELECT employee_ID FROM employee WHERE employee_name = ?",
      [employee_name]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Employee not found" });
    }

    const employee_ID = rows[0].employee_ID;

    res.json({ success: true, employee_ID });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

exports.getEmployeePosition = async (req, res) => {
  const { employee_name } = req.query;

  try {
    const [rows] = await pool.query(
      "SELECT position FROM employee WHERE employee_name = ?",
      [employee_name]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const position = rows[0].position;

    res.json({ success: true, position });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

exports.getAllEmployees = async (req, res) => {
  const { employee_name, position, location } = req.query;

  try {
    let query = `
      SELECT 
        e.employee_ID, 
        e.employee_name, 
        e.position, 
        COALESCE(f.location, 'Not Assigned') AS facility_location
      FROM employee e
      LEFT JOIN facility f ON e.works_in = f.facility_ID
    `;
    
    let conditions = [];
    let queryParams = [];

    if (employee_name) {
      conditions.push(`e.employee_name LIKE ?`);
      queryParams.push(`%${employee_name}%`);
    }

    if (position) {
      conditions.push(`e.position = ?`)
      queryParams.push(`${position}`);
    }

    if (location) {
      conditions.push(`f.location LIKE ?`)
      queryParams.push(`%${location}`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    const [result] = await pool.query(query, queryParams);

    res.json({ success: true, employees: result });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

exports.getEmployeesByManagerID = async (req, res) => {
  const { manager_ID, employee_name } = req.query;
  try {
    let query = `
      SELECT 
        e.employee_ID, 
        e.employee_name, 
        e.position 
      FROM employee e
      LEFT JOIN facility f ON e.works_in = f.facility_ID
      WHERE e.works_in = GetFacilityByEmployee(?)
    `

    let conditions = [];
    let queryParams = [manager_ID];

    if (employee_name) {
      conditions.push(`e.employee_name LIKE ?`);
      queryParams.push(`%${employee_name}%`);
    }

    if (conditions.length > 0) {
      query += ` AND ` + conditions.join(" AND ");
    }

    const [result] = await pool.query(query, queryParams);

    res.json({ success: true, employees: result });

  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}
  


exports.employeeExists = async (req, res) => {
  const { employee_name } = req.query;

  try {
    const [rows] = await pool.query(
      "SELECT employee_name FROM employee WHERE employee_name = ?",
      [employee_name]
    );

    if (rows.length === 0) {
      return res.json({ success: false, message: "Employee does not exist" });
    }

    res.json({ success: true, message: "Employee exists" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

exports.addAdmin = async (req, res) => {
  const { employee_name, password } = req.body;
  const position = "admin";

  try {
    const [existingUser] = await pool.query(
      "SELECT employee_name FROM employee WHERE employee_name = ?",
      [employee_name]
    );
    
    if (existingUser.length > 0) {
      return res.status(409).json({ success: false, message: "Employee with this name already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO employee (employee_name, position, password) VALUES (?, ?, ?)",
      [employee_name, position, hashedPassword]
    );

    res.json({ success: true, message: "Admin added successfully" });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });

  }
};

exports.addAuditor = async (req, res) => {
  const { employee_name, password } = req.body;
  const position = "auditor";

  try {
    const [existingUser] = await pool.query(
      "SELECT employee_name FROM employee WHERE employee_name = ?",
      [employee_name]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ success: false, message: "Employee with this name already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "INSERT INTO employee (employee_name, position, password) VALUES (?, ?, ?)",
      [employee_name, position, hashedPassword]
    );

    res.json({ success: true, message: "Auditor added successfully" });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

exports.addWarehouseManager = async (req, res) => {
  const { employee_name, facility: warehouseLocation, password } = req.body;
  const position = "warehouse-manager";

  try {
    const [existingUser] = await pool.query(
      "SELECT employee_name FROM employee WHERE employee_name = ?",
      [employee_name]
    );
    
    if (existingUser.length > 0) {
      return res.status(409).json({ success: false, message: "Employee with this username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [warehouseIdResponse] = await pool.query(
      "SELECT facility_ID FROM facility WHERE location = ?",
      [warehouseLocation]
    );
    if (warehouseIdResponse.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Warehouse location not found",
      });
    }
    
    const warehouseID = warehouseIdResponse[0].facility_ID;

    await pool.query(
      "INSERT INTO employee (employee_name, position, works_in, password) VALUES (?, ?, ?, ?)",
      [employee_name, position, warehouseID, hashedPassword]
    );

    res.json({ success: true, message: "Warehouse Manager added successfully" });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });

  }
};

exports.addWarehouseEmployee = async (req, res) => {
  const { employee_name, facility: warehouseLocation, password } = req.body;
  const position = "warehouse-employee";

  try {
    const [existingUser] = await pool.query(
      "SELECT employee_name FROM employee WHERE employee_name = ?",
      [employee_name]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ 
        success: false,
        message: "Employee with this username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [warehouseIdResponse] = await pool.query(
      "SELECT facility_ID FROM facility WHERE location = ?",
      [warehouseLocation]
    );

    if (warehouseIdResponse.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "Warehouse location not found" 
      });
    }

    const warehouseID = warehouseIdResponse[0].facility_ID;

    await pool.query(
      "INSERT INTO employee (employee_name, position, works_in, password) VALUES (?, ?, ?, ?)",
      [employee_name, position, warehouseID, hashedPassword]
    );

    res.json({ 
      success: true, 
      message: "Warehouse Employee added successfully" 
    });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

exports.addStoreManager = async (req, res) => {
  const { employee_name, facility: storeLocation, password } = req.body;
  const position = "store-manager";

  try {
    const [existingUser] = await pool.query(
      "SELECT employee_name FROM employee WHERE employee_name = ?",
      [employee_name]
    );

    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Employee with this username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [storeIdResponse] = await pool.query(
      "SELECT facility_ID FROM facility WHERE location = ?",
      [storeLocation]
    );

    if (storeIdResponse.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store location not found",
      });
    }

    const storeID = storeIdResponse[0].facility_ID;

    await pool.query(
      "INSERT INTO employee (employee_name, position, works_in, password) VALUES (?, ?, ?, ?)",
      [employee_name, position, storeID, hashedPassword]
    );

    res.json({ success: true, message: "Store Manager added successfully" });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

exports.addStoreEmployee = async (req, res) => {
  const { employee_name, facility: storeLocation, password } = req.body;
  const position = "store-employee";

  try {
    const [existingUser] = await pool.query(
      "SELECT employee_name FROM employee WHERE employee_name = ?",
      [employee_name]
    );

    if (existingUser.length > 0) {
      return res
        .status(409)
        .json({ success: false, message: "Employee with this username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [storeIdResponse] = await pool.query(
      "SELECT facility_ID FROM facility WHERE location = ?",
      [storeLocation]
    );

    if (storeIdResponse.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Store location not found",
      });
    }

    const storeID = storeIdResponse[0].facility_ID;

    await pool.query(
      "INSERT INTO employee (employee_name, position, works_in, password) VALUES (?, ?, ?, ?)",
      [employee_name, position, storeID, hashedPassword]
    );

    res.json({ success: true, message: "Store Employee added successfully" });
  } catch (error) {
    console.error("Database error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// TODO: Implement this function
exports.deleteEmployee = async (req, res) => {
  const { employee_ID } = req.body;

  res.json({ success: true, message: "Employee deleted successfully." });
  
}

exports.getWorksIn = async (req, res) => {
  const { employee_name } = req.query;

  try {
    const [rows] = await pool.query(
      "SELECT works_in FROM employee WHERE employee_name = ?",
      [employee_name]
    );

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const works_in = rows[0].works_in;

    res.json({ success: true, works_in });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}