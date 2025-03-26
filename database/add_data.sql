-- Insert Facilities (Warehouses & Stores)
INSERT INTO facility (type, location, coordinates) VALUES
('warehouse', 'Warehouse 1 - Mumbai', '19.0760,72.8777'),
('warehouse', 'Warehouse 2 - Delhi', '28.7041,77.1025'),
('store', 'Store 1 - Bengaluru', '12.9716,77.5946'),
('store', 'Store 2 - Hyderabad', '17.3850,78.4867');

-- Insert Employees
INSERT INTO employee (employee_name, position, works_in, password) VALUES
('John Doe', 'warehouse_manager', 1, 'pass123'),
('Jane Smith', 'warehouse_employee', 1, 'pass123'),
('Robert Brown', 'warehouse_employee', 2, 'pass123'),
('Alice Johnson', 'store_manager', 3, 'pass123'),
('Charlie Lee', 'store_employee', 3, 'pass123'),
('Emma Davis', 'store_manager', 4, 'pass123'),
('Liam Wilson', 'store_employee', 4, 'pass123'),
('Admin User', 'admin', NULL, 'adminpass');

-- Insert Brands
INSERT INTO brand (brand_name, contact_info) VALUES
('Nike', 'contact@nike.com'),
('Adidas', 'contact@adidas.com'),
('Puma', 'contact@puma.com'),
('Reebok', 'contact@reebok.com');

-- Insert Categories
INSERT INTO category (category_name) VALUES
('Sneakers'),
('Running Shoes'),
('Formal Shoes'),
('Sandals');

-- Insert Products
INSERT INTO product (name, price, category_ID, brand_name) VALUES
('Nike Air Max', 120.00, 1, 'Nike'),
('Adidas Ultraboost', 150.00, 2, 'Adidas'),
('Puma Formal Black', 80.00, 3, 'Puma'),
('Reebok Sports Sandals', 50.00, 4, 'Reebok');

-- Insert Stock
INSERT INTO stock (product_ID, facility_ID, quantity, reorder_level) VALUES
(1, 1, 50, 10),
(2, 1, 30, 5),
(3, 2, 40, 8),
(4, 2, 25, 5),
(1, 3, 15, 5),
(2, 3, 10, 3),
(3, 4, 20, 5),
(4, 4, 12, 3);

-- Insert Inventory Transactions
INSERT INTO inventory_transactions (product_ID, requested_to, requested_by, quantity, processed) VALUES
(1, 1, 4, 5, TRUE),
(2, 2, 3, 8, FALSE);

-- Insert Factory Orders
INSERT INTO factory_orders (product_ID, ordered_by, quantity, processed) VALUES
(1, 1, 20, FALSE),
(3, 3, 15, TRUE);

-- Insert Customers
INSERT INTO customer (customer_name, mobile) VALUES
('Michael Scott', '9876543210'),
('Dwight Schrute', '9876543211'),
('Jim Halpert', '9876543212');

-- Insert Sales
INSERT INTO sales (facility_ID, employee_ID, customer_ID, product_ID, quantity) VALUES
(3, 5, 1, 1, 1),
(4, 7, 2, 3, 2);
