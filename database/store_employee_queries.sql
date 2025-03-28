-- view Stock
SELECT 
    p.name AS product_name,
    f.location AS facility_location,
    s.quantity,
    s.reorder_level
FROM stock s
JOIN product p ON s.product_ID = p.product_ID
JOIN facility f ON s.facility_ID = f.facility_ID
WHERE s.facility_ID = GetFacilityByEmployee(5);  -- Replace 5 with an actual employee_ID
AND p.name = 'Nike Air Max' -- change accordingly


-- view Sales
SELECT
    s.sale_ID,
    s.sale_time,
    f.location AS facility_location,
    -- e.employee_name,
    c.customer_name,
    p.name AS product_name,
    s.quantity
FROM sales s
JOIN facility f ON s.facility_ID = f.facility_ID
JOIN employee e ON s.employee_ID = e.employee_ID
JOIN customer c ON s.customer_ID = c.customer_ID
JOIN product p ON s.product_ID = p.product_ID
WHERE s.facility_ID = GetFacilityByEmployee(19);  -- Replace 5 with an actual employee_ID
AND s.sale_time >= '2025-03-22' AND s.sale_time < '2026-03-23'  -- Adjust based on available data
AND p.name = 'Nike Air Max';  -- Replace with an actual product name





