-- view Inventory Transactions
SELECT 
    it.transaction_ID, 
    it.Time AS transaction_time,
    p.name AS product_name, 
    f_from.location AS requested_from_location,
    e.employee_name AS requested_by_employee,
    it.quantity,
    it.processed
FROM inventory_transactions it
JOIN product p ON it.product_ID = p.product_ID
JOIN facility f_to ON it.requested_to = f_to.facility_ID
JOIN employee e ON it.requested_by = e.employee_ID
LEFT JOIN facility f_from ON e.works_in = f_from.facility_ID 
WHERE f_to.facility_ID = GetFacilityByEmployee(5)  -- Replace with warehouse manager ID
AND it.Time >= '2025-01-01' AND it.Time < '2026-01-01'  -- Adjust date range as needed
AND f_from.location = 'Store 1 - Bengaluru'  -- Replace with an actual requesting facility
AND p.name = 'Nike Air Max'  -- Replace with an actual product name
AND it.processed = FALSE;  -- Show only unprocessed transactions


-- view factory details 
SELECT 
    fo.order_ID, 
    fo.order_time, 
    p.name AS product_name, 
    fo.quantity, 
    fo.processed
FROM factory_orders fo
JOIN product p ON fo.product_ID = p.product_ID
JOIN employee e ON fo.ordered_by = e.employee_ID
WHERE.employee_ID = 5 -- Replace with warehouse manager ID
AND fo.order_time >= '2025-01-01' AND fo.order_time < '2026-01-01'  -- Adjust date range as needed
AND p.name = 'Nike Air Max'  -- Replace with an actual product name
AND fo.processed = FALSE;  -- Show only unprocessed orders

-- view Stock
SELECT 
    p.name AS product_name,
    f.location AS facility_location,
    s.quantity,
    s.reorder_level
FROM stock s
JOIN product p ON s.product_ID = p.product_ID
JOIN facility f ON s.facility_ID = f.facility_ID
WHERE f.facility_ID = GetFacilityByEmployee(5)  -- Replace with warehouse manager ID
AND p.name = 'Nike Air Max'  -- Replace with an actual product name
