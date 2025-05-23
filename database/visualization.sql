-- brand vs sales
SELECT 
    p.brand_name AS Brand,
    SUM(s.quantity * p.price) AS Total_Sales_Amount
FROM sales s
JOIN product p ON s.product_ID = p.product_ID
GROUP BY p.brand_name
ORDER BY Total_Sales_Amount DESC
LIMIT 5;

-- most sold product
SELECT 
    p.name AS Product,
    SUM(s.quantity * p.price) AS Total_Sales_Amount,
    SUM(s.quantity) AS Total_Quantity_Sold
FROM sales s
JOIN product p ON s.product_ID = p.product_ID
GROUP BY p.name
ORDER BY Total_Quantity_Sold DESC
LIMIT 5;

-- Busiest 5 Stores
SELECT 
    f.location AS Store,
    SUM(s.quantity * p.price) AS Total_Sales_Amount
FROM sales s
JOIN facility f ON s.facility_ID = f.facility_ID
JOIN product p ON s.product_ID = p.product_ID
WHERE f.type = 'store'
GROUP BY f.location
ORDER BY Total_Sales_Amount DESC
LIMIT 5;

-- Busiest 5 Warehouses
SELECT 
    f.location AS Warehouse,
    SUM(it.quantity) AS Total_Quantity_Processed
FROM inventory_transactions it
JOIN facility f ON it.requested_to = f.facility_ID
WHERE f.type = 'warehouse'
GROUP BY f.location
ORDER BY Total_Quantity_Processed DESC
LIMIT 5;

-- Top 5 Best Employees
SELECT 
    e.employee_name AS Employee,
    SUM(s.quantity * p.price) AS Total_Sales_Amount
FROM sales s
JOIN employee e ON s.employee_ID = e.employee_ID
JOIN product p ON s.product_ID = p.product_ID
GROUP BY e.employee_name
ORDER BY Total_Sales_Amount DESC
LIMIT 5;

-- Most Common Transactions (Grouped by Store and Warehouse)
SELECT 
    s.facility_ID AS Store_ID,
    f1.location AS Store_Location,
    it.requested_to AS Warehouse_ID,
    f2.location AS Warehouse_Location,
    COUNT(*) AS Transaction_Count
FROM inventory_transactions it
JOIN sales s ON it.product_ID = s.product_ID
JOIN facility f1 ON s.facility_ID = f1.facility_ID
JOIN facility f2 ON it.requested_to = f2.facility_ID
WHERE f1.type = 'store' AND f2.type = 'warehouse'
GROUP BY s.facility_ID, it.requested_to, f1.location, f2.location
ORDER BY Transaction_Count DESC
LIMIT 5;

-- sales vs month 
SELECT DATE_FORMAT(sale_time, '%Y-%m') AS sale_month, COUNT(*) AS total_sales
FROM sales
WHERE sale_time >= DATE_SUB(NOW(), INTERVAL 6 MONTH)
GROUP BY sale_month
ORDER BY sale_month;

--sales vs year
SELECT YEAR(sale_time) AS sale_year, COUNT(*) AS total_sales
FROM sales
GROUP BY sale_year
ORDER BY sale_year;

-- sales of last 30 days
SELECT 
    DATE(sale_time) AS sale_date,  -- Extract only the date
    COUNT(*) AS total_sales
FROM sales
WHERE sale_time >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
GROUP BY sale_date
ORDER BY sale_date DESC;

-- price of sales vs 6 months
SELECT 
    DATE_FORMAT(s.sale_time, '%Y-%m-%d') AS sale_date,  
    SUM(s.quantity * p.price) AS total_sales_amount 
FROM sales s
JOIN product p ON s.product_ID = p.product_ID 
WHERE s.sale_time >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
GROUP BY sale_date
ORDER BY sale_date DESC;


