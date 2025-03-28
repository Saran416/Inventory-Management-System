const pool = require("../config/db");

exports.getInventoryTransactions = async (req, res) => {
  const { 
    start_date, 
    end_date, 
    from_location, 
    to_location, 
    product_name } = req.query;


  try {
    let query = `
      SELECT 
        it.transaction_ID, 
        it.Time AS transaction_time,
        p.name AS product_name, 
        f_to.location AS requested_to_location,
        f_from.location AS requested_from_location,  -- New column added
        e.employee_name AS requested_by_employee,
        it.quantity,
        it.processed
      FROM inventory_transactions it
      JOIN product p ON it.product_ID = p.product_ID
      JOIN facility f_to ON it.requested_to = f_to.facility_ID
      JOIN employee e ON it.requested_by = e.employee_ID
      LEFT JOIN facility f_from ON e.works_in = f_from.facility_ID
    `;

    let conditions = [];
    let queryParams = [];

    if (start_date) {
      conditions.push(`it.Time >= ?`);
      queryParams.push(start_date);
    }

    if (end_date) {
      conditions.push(`it.Time <= ?`);
      queryParams.push(end_date);
    }

    if (from_location) {
      conditions.push(`f_from.location LIKE ?`);
      queryParams.push(`%${from_location}%`);
    }

    if (to_location) {
      conditions.push(`f_to.location LIKE ?`);
      queryParams.push(`%${to_location}%`);
    }

    if (product_name) {
      conditions.push(`p.name LIKE ?`);
      queryParams.push(`%${product_name}%`);
    }

    conditions.push(`it.processed = 1`); // Only show processed transactions

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    const [result] = await pool.query(query, queryParams);

    res.json({ success: true, inventory_transactions: result });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
  
exports.getInventoryTransactionsByManagerID = async (req, res) => {
  const { manager_id,
    start_date, 
    end_date, 
    from_location, 
    product_name } = req.params;

  try {
    let query = `
      SELECT 
        it.transaction_ID, 
        it.Time AS transaction_time,
        p.name AS product_name, 
        f_to.location AS requested_to_location,
        e.employee_name AS requested_by_employee,
        it.quantity,
        it.processed
      FROM inventory_transactions it
      JOIN product p ON it.product_ID = p.product_ID
      JOIN facility f_to ON it.requested_to = f_to.facility_ID
      JOIN employee e ON it.requested_by = e.employee_ID
      LEFT JOIN facility f_from ON e.works_in = f_from.facility_ID
      WHERE f_from.facility_ID = GetFacilityByEmployee(?)
    `;

    let conditions = [];
    let queryParams = [manager_id];

    if (start_date) {
      conditions.push(`it.Time >= ?`);
      queryParams.push(start_date);
    }

    if (end_date) {
      conditions.push(`it.Time <= ?`);
      queryParams.push(end_date);
    }

    if (from_location) {
      conditions.push(`f_from.location LIKE ?`);
      queryParams.push(`%${from_location}%`);
    }

    if (product_name) {
      conditions.push(`p.name LIKE ?`);
      queryParams.push(`%${product_name}%`);
    }

    conditions.push(`it.processed = FALSE`); // Only show processed transactions


    res.json({ success: true, inventory_transactions: result });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

// TODO: check this
exports.getFactoryOrders = async (req, res) => {
  const { 
    start_date, 
    end_date, 
    employee_name, 
    product_name,
    processed,
   } = req.query;

  try {
    let query = `
      SELECT 
        fo.order_ID, 
        fo.order_time, 
        p.name AS product_name, 
        e.employee_name AS ordered_by_employee, 
        fo.quantity, 
        fo.processed
      FROM factory_orders fo
      JOIN product p ON fo.product_ID = p.product_ID
      JOIN employee e ON fo.ordered_by = e.employee_ID
    `;

    let conditions = [];
    let queryParams = [];

    if (start_date) {
      conditions.push(`fo.order_time >= ?`);
      queryParams.push(start_date);
    }

    if (end_date) {
      conditions.push(`fo.order_time <= ?`);
      queryParams.push(end_date);
    }

    if (employee_name) {
      conditions.push(`e.employee_name LIKE ?`);
      queryParams.push(`%${employee_name}%`);
    } 

    if (product_name) {
      conditions.push(`p.name LIKE ?`);
      queryParams.push(`%${product_name}%`);
    }

    if (processed) {
      if (processed === "TRUE") {
        conditions.push(`fo.processed = TRUE`);
      } else if (processed === "FALSE") {
        conditions.push(`fo.processed = FALSE`);
      }
    }

    conditions.push(`fo.processed = FALSE`);

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(" AND ");
    }

    const [result] = await pool.query(query, queryParams);

    res.json({ success: true, factory_orders: result });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}