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

    conditions.push(`it.processed = 1 or it.processed = 2 or it.processed = 3`); // Only show processed transactions

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

exports.getInventoryTransactionsByStoreManagerID = async (req, res) => {
  const { manager_ID,
    start_date,
    end_date,
    to_location,
    product_name } = req.query;

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
    let queryParams = [manager_ID];

    if (start_date) {
      conditions.push(`it.Time >= ?`);
      queryParams.push(start_date);
    }

    if (end_date) {
      conditions.push(`it.Time <= ?`);
      queryParams.push(end_date);
    }

    if (to_location) {
      conditions.push(`f_to.location LIKE ?`);
      queryParams.push(`%${to_location}%`);
    }

    if (product_name) {
      conditions.push(`p.name LIKE ?`);
      queryParams.push(`%${product_name}%`);
    }

    conditions.push(`(it.processed = 1 or it.processed = 2 or it.processed = 3)`); // Only show processed transactions

    if (conditions.length > 0) {
      query += ` AND ` + conditions.join(" AND ");
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
}

exports.getInventoryTransactionsByWarehouseManagerID = async (req, res) => {
  const { manager_ID,
    start_date,
    end_date,
    from_location,
    product_name } = req.query;

  try {
    let query = `
      SELECT 
        it.transaction_ID, 
        it.Time AS transaction_time,
        p.name AS product_name, 
        f_from.location AS request_from_location,
        e.employee_name AS requested_by_employee,
        it.quantity,
        it.processed
      FROM inventory_transactions it
      JOIN product p ON it.product_ID = p.product_ID
      JOIN facility f_to ON it.requested_to = f_to.facility_ID
      JOIN employee e ON it.requested_by = e.employee_ID
      LEFT JOIN facility f_from ON e.works_in = f_from.facility_ID 
      WHERE f_to.facility_ID = GetFacilityByEmployee(?)
    `;
    let conditions = [];
    let queryParams = [manager_ID];

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

    conditions.push(`(it.processed = 1 or it.processed = 2 or it.processed = 3)`); // Only show processed transactions

    if (conditions.length > 0) {
      query += ` AND ` + conditions.join(" AND ");
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
}

exports.getFactoryOrders = async (req, res) => {
  const {
    start_date,
    end_date,
    product_name,
    manager_ID
  } = req.query;

  try {
    let query = `
      SELECT 
        fo.order_ID, 
        fo.order_time, 
        p.name AS product_name, 
        fo.quantity, 
        fo.processed
      FROM factory_orders fo
      JOIN product p ON fo.product_ID = p.product_ID
      JOIN employee e ON fo.ordered_by = e.employee_ID
      WHERE e.employee_ID = ?
    `;

    let conditions = [];
    let queryParams = [manager_ID];

    if (start_date) {
      conditions.push(`fo.order_time >= ?`);
      queryParams.push(start_date);
    }

    if (end_date) {
      conditions.push(`fo.order_time <= ?`);
      queryParams.push(end_date);
    }


    if (product_name) {
      conditions.push(`p.name LIKE ?`);
      queryParams.push(`%${product_name}%`);
    }

    conditions.push(`(fo.processed = TRUE or fo.processed = FALSE)`); 

    // conditions.push(`fo.processed = FALSE`);

    if (conditions.length > 0) {
      query += ` AND ` + conditions.join(" AND ");
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

exports.addFactoryOrder = async (req, res) => {
  const { 
    product_id,
    quantity,
    manager_ID } = req.body;

  try {
    const [result] = await pool.query(
      `CALL PlaceOrderToFactory(?, ?, ?)`,
      [product_id, quantity, manager_ID]
    );

    res.json({ success: true, message: "Factory order added successfully." });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}
exports.addInventoryTransaction = async (req, res) => {
  const {
    warehouse_ID,
    emp_ID,
    prod_ID,
    stock_quantity,
  } = req.body;

  try {
    const [result] = await pool.query(
      `CALL RequestInventoryTransaction(?, ?, ?, ?)`,
      [warehouse_ID, emp_ID, prod_ID, stock_quantity]
    );

    res.json({ success: true, message: "Stock request added successfully." });
  }
  catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

exports.markTransactionAsCompleted = async (req, res) => {
  const { transaction_ID } = req.body;

  try {
    const [result] = await pool.query(
      `CALL MarkTransactionAsCompleted(?)`,
      [transaction_ID]
    );

    res.status(200).json({ success: true, message: "Transaction marked as complete." });
  }
  catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
}

exports.markTransactionAsAccepted = async (req, res) => {
  const { transaction_ID } = req.body;

  try {
    const [result] = await pool.query(
      `CALL MarkTransactionAsAccepted(?)`,
      [transaction_ID]
    );

    res.status(200).json({ success: true, message: "Transaction marked as accepted." });
  }
  catch (error) {
    console.error("Database error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }


}

