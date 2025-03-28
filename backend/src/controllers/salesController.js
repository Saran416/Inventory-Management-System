const pool = require("../config/db");

exports.getSales = async (req, res) => {
  const { start_date, end_date, location, salesman_name, product_name } = req.query;


  try {
    let query = `
      SELECT 
        s.sale_ID,
        s.sale_time,
        f.location AS facility_location,
        e.employee_name,
        c.customer_name,
        p.name AS product_name,
        s.quantity
      FROM sales s
      JOIN facility f ON s.facility_ID = f.facility_ID
      JOIN employee e ON s.employee_ID = e.employee_ID
      JOIN customer c ON s.customer_ID = c.customer_ID
      JOIN product p ON s.product_ID = p.product_ID
    `;

    // Array to store conditions
    let conditions = [];
    let queryParams = [];

    // Add conditions dynamically
    if (start_date) {
      conditions.push(`s.sale_time >= ?`);
      queryParams.push(start_date);
    }

    if (end_date) {
      conditions.push(`s.sale_time <= ?`);
      queryParams.push(end_date);
    }

    if (location) {
      conditions.push(`f.location LIKE ?`);
      queryParams.push(`%${location}%`);
    }

    if (salesman_name) {
      conditions.push(`e.employee_name LIKE ?`);
      queryParams.push(`%${salesman_name}%`);
    }

    if (product_name) {
      conditions.push(`p.name LIKE ?`);
      queryParams.push(`%${product_name}%`);
    }


    // Add conditions to the query if any
    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    // console.log(query);
    // console.log(queryParams);

    // Execute parameterized query
    const [result] = await pool.query(query, queryParams);

    // console.log(result);
    res.json({ success: true, sales: result });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
  
exports.getSalesByEmployeeID = async (req, res) => {
  const { start_date, end_date, product_name, employee_ID } = req.query;

  try {
    let query = `
      SELECT
        s.sale_ID,
        s.sale_time,
        f.location AS facility_location,
        c.customer_name,
        p.name AS product_name,
        s.quantity
      FROM sales s
      JOIN facility f ON s.facility_ID = f.facility_ID
      JOIN employee e ON s.employee_ID = e.employee_ID
      JOIN customer c ON s.customer_ID = c.customer_ID
      JOIN product p ON s.product_ID = p.product_ID
      WHERE s.facility_ID = GetFacilityByEmployee(?)
    `;

    let conditions = [];
    let queryParams = [employee_ID];

    if (start_date) {
      conditions.push(`s.sale_time >= ?`);
      queryParams.push(start_date);
    }

    if (end_date) {
      conditions.push(`s.sale_time <= ?`);
      queryParams.push(end_date);
    }

    if (product_name) {
      conditions.push(`p.name LIKE ?`);
      queryParams.push(`%${product_name}%`);
    }

    if (conditions.length > 0) {
      query += ` AND ` + conditions.join(" AND ");
    }

    const [result] = await pool.query(query, queryParams);

    res.json({ success: true, sales: result });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

exports.addSale = async (req, res) => {
  const { customer_name, customer_number, product_ID, quantity, employee_ID } = req.body;

  try {
    let [response] = await pool.query(
      `CALL process_sale (?, ?, ?, ?, ?)`,
      [customer_name, customer_number, product_ID, quantity, employee_ID]
    );

    res.json({ success: true, message: "Sale added successfully." });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }

  // res.json({ success: true, sale_ID: 1 });
}