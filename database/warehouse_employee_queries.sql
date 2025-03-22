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