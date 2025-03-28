DELIMITER $$

CREATE FUNCTION GetFacilityByEmployee(emp_ID INT) RETURNS INT
DETERMINISTIC
BEGIN
    DECLARE facility_ID INT;
    
    SELECT works_in INTO facility_ID 
    FROM employee 
    WHERE employee_ID = emp_ID;
    
    RETURN facility_ID;
END $$

DELIMITER ;


-- view Employees
SELECT 
    e.employee_ID, 
    e.employee_name, 
    e.position, 
FROM employee e
LEFT JOIN facility f ON e.works_in = f.facility_ID
WHERE e.works_in = GetFacilityByEmployee(5)  -- Replace 5 with the actual employee_ID
AND e.position = 'store-manager'  -- Replace with an actual position
AND e.employee_name = 'John Doe';  -- Replace with an actual employee name


-- view Sales
SELECT
    s.sale_ID,
    s.sale_time,
    e.employee_name,
    c.customer_name,
    c.mobile,
    p.name AS product_name,
    s.quantity
FROM sales s
JOIN facility f ON s.facility_ID = f.facility_ID
JOIN employee e ON s.employee_ID = e.employee_ID
JOIN customer c ON s.customer_ID = c.customer_ID
JOIN product p ON s.product_ID = p.product_ID
WHERE s.facility_ID = GetFacilityByEmployee(5);  -- Replace 5 with an actual employee_ID
AND s.sale_time >= '2025-03-22' AND s.sale_time < '2026-03-23'  -- Adjust based on available data
AND p.name = 'Nike Air Max';  -- Replace with an actual product name

-- view Stock
SELECT 
    p.name AS product_name,
    s.quantity,
    s.reorder_level
FROM stock s
JOIN product p ON s.product_ID = p.product_ID
JOIN facility f ON s.facility_ID = f.facility_ID
WHERE s.facility_ID = GetFacilityByEmployee(5);  -- Replace 5 with an actual employee_ID
AND p.name = 'Nike Air Max' -- change accordingly


-- view Inventory Transactions
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
WHERE f_from.facility_ID = GetFacilityByEmployee(5);  -- Replace 5 with actual employee_ID
AND it.Time >= '2025-01-01' AND it.Time < '2026-01-01'  -- Adjust date range as needed
AND f_to.location = 'Warehouse 1 - Mumbai'  -- Replace with an actual facility location
AND p.name = 'Nike Air Max'  -- Replace with an actual product name
AND it.processed = FALSE;  -- Show only unprocessed transactions

-- view Alerts
SELECT 
    a.id AS alert_ID,
    p.name AS product_name,
    s.quantity AS stock,
    s.reorder_level,
    a.triggerd_time AS alert_time
FROM alerts a
JOIN product p ON a.product_ID = p.product_ID
JOIN stock s ON a.product_ID = s.product_ID AND a.facility_ID = s.facility_ID
WHERE a.facility_ID = GetFacilityByEmployee(5);  -- Replace 5 with actual employee_ID

-- delete Alert
DELETE FROM alerts
WHERE alert_ID = 1;  -- Replace with the actual alert_ID to delete


-- Apply for Inventory Transaction
