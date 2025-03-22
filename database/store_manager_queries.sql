-- view Employees
SELECT 
    e.employee_ID, 
    e.employee_name, 
    e.position, 
    COALESCE(f.location, 'Not Assigned') AS facility_location
FROM employee e
LEFT JOIN facility f ON e.works_in = f.facility_ID
WHERE f.location = 'Store 1 - Bengaluru'  -- Replace with an actual location from the facility table
AND e.position = 'warehouse_manager'  -- Replace with an actual position from the employee table
AND e.employee_name = 'John Doe';  -- Replace with an actual employee name

-- view Sales
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
WHERE s.sale_time >= '2025-03-22' AND s.sale_time < '2026-03-23'  -- Adjust based on available data
AND f.location = 'Store 1 - Bengaluru'  -- Replace with an actual location from the facility table
AND e.employee_name = 'Charlie Lee'  -- Replace with an actual employee name
AND p.name = 'Nike Air Max';  -- Replace with an actual product name

-- view customers 
SELECT * FROM customer;

-- view Stock
SELECT 
    p.name AS product_name,
    f.location AS facility_location,
    s.quantity,
    s.reorder_level
FROM stock s
JOIN product p ON s.product_ID = p.product_ID
JOIN facility f ON s.facility_ID = f.facility_ID
WHERE f.location = 'Store 1 - Bengaluru'  -- Replace with an actual location from facility table
AND p.name = 'Nike Air Max'  -- Replace with an actual product name

-- view Inventory Transactions
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
LEFT JOIN facility f_from ON e.works_in = f_from.facility_ID  -- Joining to get employee's facility
WHERE it.Time >= '2025-01-01' AND it.Time < '2026-01-01'  -- Adjust date range as needed
AND f_to.location = 'Warehouse 1 - Mumbai'  -- Replace with an actual facility location
AND f_from.location = 'Store 1 - Bengaluru'  -- Replace with an actual requesting facility
AND p.name = 'Nike Air Max'  -- Replace with an actual product name
AND it.processed = FALSE;  -- Show only unprocessed transactions