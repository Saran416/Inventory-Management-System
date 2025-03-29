-- view Employees
SELECT 
    e.employee_ID, 
    e.employee_name, 
    e.position
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

-- update reorder level
UPDATE stock
SET reorder_level = 20  -- Replace with the new reorder level
WHERE product_ID = 1  -- Replace with the actual product_ID
AND facility_ID = GetFacilityByEmployee(5);  -- Replace 5 with the actual employee_ID

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
WHERE f_from.facility_ID = GetFacilityByEmployee(5)  -- Replace 5 with actual employee_ID
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
DELIMITER $$

CREATE PROCEDURE RequestInventoryTransaction(
    IN warehouse_ID INT,
    IN emp_ID INT,
    IN prod_ID INT,
    IN stock_quantity INT
)
BEGIN
    -- Insert the inventory transaction request
    INSERT INTO inventory_transactions (product_ID, requested_to, requested_by, quantity, processed)
    VALUES (prod_ID, warehouse_ID, emp_ID, stock_quantity, "sent");
END $$

DELIMITER ;


-- Mark Transaction as completed
DELIMITER $$
CREATE PROCEDURE MarkTransactionAsCompleted(
    IN transaction_ID_arg INT
)
BEGIN
    -- update the stock table according to the transaction id
    DECLARE v_product_id INT;
    DECLARE v_facility_id INT;
    DECLARE v_quantity INT;
    DECLARE v_existing_stock INT;
    DECLARE v_employee_id INT;

    -- Get the transaction details
    SELECT product_ID, requested_to, quantity, requested_by
    INTO v_product_id, v_facility_id, v_quantity, v_employee_id
    FROM inventory_transactions
    WHERE transaction_ID = transaction_ID_arg;

    -- update the stock table with the quantity
    SELECT quantity
    INTO v_existing_stock
    FROM stock
    WHERE product_ID = v_product_id AND facility_ID = GetFacilityByEmployee(v_employee_id)
    LIMIT 1;
    -- Update stock
    UPDATE stock
    SET quantity = v_existing_stock + v_quantity
    WHERE product_ID = v_product_id AND facility_ID = GetFacilityByEmployee(v_employee_id);

    -- Update the inventory transaction to mark it as completed
    UPDATE inventory_transactions
    SET processed = "completed"
    WHERE transaction_ID = transaction_ID_arg;


END $$
DELIMITER ;
