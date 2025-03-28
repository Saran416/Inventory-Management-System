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

-- view Sales
DELIMITER $$

CREATE PROCEDURE GetEmployeeSales(IN emp_ID BIGINT UNSIGNED)
BEGIN
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
    WHERE s.employee_ID = emp_ID;
END $$

DELIMITER ;
