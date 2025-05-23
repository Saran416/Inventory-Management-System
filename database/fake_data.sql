INSERT INTO customer (customer_name, mobile) VALUES
('Alice Johnson', '1234567890'),
('Bob Smith', '2345678901'),
('Charlie Brown', '3456789012'),
('Diana Evans', '4567890123'),
('Edward Green', '5678901234'),
('Fiona White', '6789012345'),
('George Black', '7890123456'),
('Hannah Scott', '8901234567'),
('Ian Miller', '9012345678'),
('Jessica Adams', '0123456789'),
('Kevin Roberts', '1112223334'),
('Laura Carter', '2223334445'),
('Michael Lewis', '3334445556'),
('Natalie Walker', '4445556667'),
('Oliver Harris', '5556667778'),
('Patricia Allen', '6667778889'),
('Quincy Hall', '7778889990'),
('Rachel Young', '8889990001'),
('Samuel King', '9990001112'),
('Tina Nelson', '0001112223'),
('Ursula Brooks', '1122334455'),
('Victor Foster', '2233445566'),
('Wendy Mitchell', '3344556677'),
('Xavier Price', '4455667788'),
('Yvonne Perry', '5566778899'),
('Zachary Reed', '6677889900'),
('Abigail Turner', '7788990011'),
('Benjamin Collins', '8899001122'),
('Catherine Stewart', '9900112233'),
('David Barnes', '1011121314'),
('Eleanor Wood', '1213141516'),
('Franklin Ross', '1314151617'),
('Grace Hughes', '1415161718'),
('Henry Richardson', '1516171819'),
('Isabella Simmons', '1617181920'),
('Jacob Morgan', '1718192021'),
('Katherine Cook', '1819202122'),
('Leonard Bell', '1920212223'),
('Madeline Griffin', '2021222324'),
('Nathan Russell', '2122232425'),
('Olivia Peterson', '2223242526'),
('Peter Campbell', '2324252627'),
('Quinn Sanders', '2425262728'),
('Rebecca Ward', '2526272829'),
('Steven Powell', '2627282930'),
('Teresa Morris', '2728293031'),
('Ulysses Rogers', '2829303132'),
('Vanessa Howard', '2930313233'),
('Walter Jenkins', '3031323334');

INSERT INTO facility (type, location, coordinates) VALUES
('Warehouse', 'Warehouse 1 - Mumbai', '100,100'),
('Warehouse', 'Warehouse 1 - Hyderabad', '200,200'),
('Warehouse', 'Warehouse 1 - Chennai', '300,300'),
('Warehouse', 'Warehouse 1 - Bengaluru', '400,400'),
('Store', 'Store 1 - Mumbai', '105,105'),
('Store', 'Store 2 - Mumbai', '110,110'),
('Store', 'Store 3 - Mumbai', '115,115'),
('Store', 'Store 1 - Hyderabad', '205,205'),
('Store', 'Store 2 - Hyderabad', '210,210'),
('Store', 'Store 3 - Hyderabad', '215,215'),
('Store', 'Store 1 - Chennai', '305,305'),
('Store', 'Store 2 - Chennai', '310,310'),
('Store', 'Store 3 - Chennai', '315,315'),
('Store', 'Store 1 - Bengaluru', '405,405'),
('Store', 'Store 2 - Bengaluru', '410,410'),
('Store', 'Store 3 - Bengaluru', '415,415');

INSERT INTO employee (employee_name, position, works_in, password) VALUES
('admin1', 'admin', NULL, '$2b$10$rREnrqYS97P5ycjz6CNCNejzq1rrVrLbntroJJlItrnBJIphQALN6'),
('Admin', 'admin', NULL, 'adminpass'),
('Rajesh Kumar', 'warehouse-manager', 1, 'pass123'),
('Suresh Gupta', 'warehouse-manager', 2, 'pass123'),
('Amit Patel', 'warehouse-manager', 3, 'pass123'),
('Karthik Reddy', 'warehouse-manager', 4, 'pass123'),
('Amit Sharma', 'store-employee', 5, 'passAmit'),
('Priya Verma', 'store-employee', 6, 'passPriya'),
('Rajesh Khanna', 'store-employee', 7, 'passRajesh'),
('Sneha Iyer', 'store-employee', 8, 'passSneha'),
('Vikram Singh', 'store-employee', 9, 'passVikram'),
('Neha Pandey', 'store-employee', 10, 'passNeha'),
('Suresh Nair', 'store-employee', 11, 'passSuresh'),
('Anjali Desai', 'store-employee', 12, 'passAnjali'),
('Rohan Gupta', 'store-employee', 13, 'passRohan'),
('Meera Joshi', 'store-employee', 14, 'passMeera'),
('Tarun Malhotra', 'store-employee', 15, 'passTarun'),
('Divya Kulkarni', 'store-employee', 16, 'passDivya');
('Neha Sharma', 'store-manager', 5, 'pass123'),
('Pooja Verma', 'store-manager', 6, 'pass123'),
('Vikram Singh', 'store-manager', 7, 'pass123'),
('Rohan Das', 'store-manager', 8, 'pass123'),
('Alok Mehta', 'store-manager', 9, 'pass123'),
('Sneha Iyer', 'store-manager', 10, 'pass123'),
('Manoj Pillai', 'store-manager', 11, 'pass123'),
('Deepak Nair', 'store-manager', 12, 'pass123'),
('Asha Menon', 'store-manager', 13, 'pass123'),
('Rahul Bose', 'store-manager', 14, 'pass123'),
('Kiran Rao', 'store-manager', 15, 'pass123'), 
('Rajesh Anna', 'store-manager', 16, 'pass123');

INSERT INTO brand (brand_name, contact_info) VALUES
('Nike', 'nike@example.com'),
('Adidas', 'adidas@example.com'),
('Puma', 'puma@example.com'),
('Reebok', 'reebok@example.com'),
('Skechers', 'skechers@example.com'),
('New Balance', 'newbalance@example.com'),
('Under Armour', 'underarmour@example.com'),
('ASICS', 'asics@example.com'),
('Converse', 'converse@example.com'),
('Vans', 'vans@example.com');

INSERT INTO category (category_name) VALUES
('Running Shoes'),
('Casual Sneakers'),
('Formal Shoes'),
('Sandals & Slippers'),
('Boots'),
('Sports Shoes'),
('Loafers'),
('Flip Flops'),
('High Heels'),
('Kids Footwear');

INSERT INTO product (name, price, category_ID, brand_name) VALUES
('Nike Air Zoom', 7999.99, 1, 'Nike'),
('Adidas UltraBoost', 8999.99, 1, 'Adidas'),
('Puma Running X', 7499.99, 1, 'Puma'),
('Reebok Classic', 6499.99, 2, 'Reebok'),
('Skechers GoWalk', 5599.99, 2, 'Skechers'),
('New Balance 574', 5999.99, 2, 'New Balance'),
('Under Armour Charged', 6799.99, 1, 'Under Armour'),
('ASICS Gel Nimbus', 7199.99, 1, 'ASICS'),
('Converse Chuck Taylor', 4499.99, 2, 'Converse'),
('Vans Old Skool', 4999.99, 2, 'Vans'),
('Nike Formal Leather', 8999.99, 3, 'Nike'),
('Adidas Slip-On', 6799.99, 4, 'Adidas'),
('Puma Sandals', 4999.99, 4, 'Puma'),
('Reebok Flip Flops', 2599.99, 8, 'Reebok'),
('Skechers High Boots', 11999.99, 5, 'Skechers'),
('New Balance Kids Sneakers', 3499.99, 10, 'New Balance'),
('Nike Revolution 6', 6999.99, 1, 'Nike'),
('Adidas Gazelle', 5499.99, 2, 'Adidas'),
('Puma Ignite', 7999.99, 1, 'Puma'),
('Reebok Zig Kinetica', 8799.99, 6, 'Reebok'),
('Skechers D', 7599.99, 2, 'Skechers'),
('Nike Free RN', 7299.99, 1, 'Nike'),
('Adidas Superstar', 6399.99, 2, 'Adidas'),
('Puma Future Rider', 6899.99, 2, 'Puma'),
('Reebok Club C', 7599.99, 2, 'Reebok');

INSERT INTO stock (product_ID, facility_ID, quantity, reorder_level) VALUES
    (1, 1, 50, 10), (1, 2, 40, 10), (1, 3, 60, 15), (1, 4, 50, 10),
    (2, 1, 30, 8), (2, 2, 45, 12), (2, 3, 35, 9), (2, 4, 40, 10),
    (3, 1, 55, 10), (3, 2, 60, 12), (3, 3, 50, 15), (3, 4, 45, 10),
    (4, 5, 20, 5), (4, 6, 25, 7), (4, 7, 30, 6), (4, 8, 35, 9),
    (5, 9, 40, 10), (5, 10, 50, 12), (5, 11, 30, 8), (5, 12, 35, 9),
    (6, 13, 55, 10), (6, 14, 45, 9), (6, 15, 50, 10), (6, 16, 60, 12),
    (7, 1, 30, 7), (7, 2, 40, 10), (7, 3, 50, 12), (7, 4, 35, 8),
    (8, 5, 25, 6), (8, 6, 30, 8), (8, 7, 45, 10), (8, 8, 40, 9),
    (9, 9, 60, 15), (9, 10, 55, 12), (9, 11, 50, 10), (9, 12, 45, 9),
    (10, 13, 40, 8), (10, 14, 30, 7), (10, 15, 35, 8), (10, 16, 45, 10),
    (11, 1, 30, 7), (11, 2, 35, 8), (11, 3, 45, 10), (11, 4, 40, 9),
    (12, 5, 60, 12), (12, 6, 55, 10), (12, 7, 50, 9), (12, 8, 45, 8),
    (13, 9, 40, 8), (13, 10, 30, 7), (13, 11, 35, 8), (13, 12, 45, 10),
    (14, 13, 30, 7), (14, 14, 40, 10), (14, 15, 35, 9), (14, 16, 50, 12),
    (15, 1, 25, 6), (15, 2, 30, 8), (15, 3, 45, 10), (15, 4, 40, 9),
    (16, 5, 55, 12), (16, 6, 50, 10), (16, 7, 45, 9), (16, 8, 40, 8),
    (17, 9, 60, 15), (17, 10, 55, 12), (17, 11, 50, 10), (17, 12, 45, 9),
    (18, 13, 40, 8), (18, 14, 30, 7), (18, 15, 35, 8), (18, 16, 45, 10),
    (19, 1, 30, 7), (19, 2, 35, 8), (19, 3, 45, 10), (19, 4, 40, 9),
    (20, 5, 60, 12), (20, 6, 55, 10), (20, 7, 50, 9), (20, 8, 45, 8),
    (21, 9, 40, 8), (21, 10, 30, 7), (21, 11, 35, 8), (21, 12, 45, 10),
    (22, 13, 30, 7), (22, 14, 40, 10), (22, 15, 35, 9), (22, 16, 50, 12),
    (23, 1, 25, 6), (23, 2, 30, 8), (23, 3, 45, 10), (23, 4, 40, 9),
    (24, 5, 55, 12), (24, 6, 50, 10), (24, 7, 45, 9), (24, 8, 40, 8),
    (25, 9, 60, 15), (25, 10, 55, 12), (25, 11, 50, 10), (25, 12, 45, 9);

-- Ensuring total stock is at least 1000 units.
-- Sum of all inserted quantities = 1700+

-- Inserting sales data
INSERT INTO sales (sale_time, facility_ID, employee_ID, customer_ID, product_ID, quantity) VALUES
('2025-01-21 01:58:21', 10, 11, 1, 13, 3),
('2024-10-18 10:42:21', 10, 11, 1, 8, 1),
('2024-10-07 15:39:44', 10, 11, 1, 18, 1),
('2024-10-27 07:03:47', 11, 12, 2, 16, 3),
('2024-12-18 03:21:37', 11, 12, 2, 12, 3),
('2025-03-04 14:33:38', 13, 14, 3, 6, 2),
('2024-11-05 08:27:37', 13, 14, 3, 18, 1),
('2025-03-22 07:34:37', 13, 14, 3, 24, 2),
('2024-10-08 06:18:34', 14, 15, 4, 12, 3),
('2025-02-20 04:34:55', 14, 15, 4, 19, 3),
('2025-01-04 21:24:40', 14, 15, 4, 18, 2),
('2025-02-25 22:52:29', 12, 13, 5, 15, 1),
('2024-12-11 08:38:26', 14, 15, 6, 4, 1),
('2024-10-20 17:49:19', 14, 15, 6, 22, 3),
('2025-03-23 23:16:27', 14, 15, 6, 23, 1),
('2024-11-20 04:13:37', 8, 9, 7, 22, 3),
('2024-12-22 04:01:37', 8, 9, 7, 15, 1),
('2024-10-25 16:55:04', 8, 9, 7, 15, 2),
('2024-11-29 10:46:48', 8, 9, 8, 9, 2),
('2024-11-08 05:31:25', 8, 9, 8, 11, 1),
('2025-02-19 08:47:54', 8, 9, 8, 18, 3),
('2025-03-31 02:45:15', 14, 15, 9, 13, 2),
('2024-11-05 15:27:02', 14, 15, 9, 21, 3),
('2025-02-02 10:52:05', 14, 15, 9, 6, 1),
('2025-02-14 14:21:14', 14, 15, 10, 22, 2),
('2024-11-19 08:00:05', 14, 15, 10, 20, 2),
('2025-03-12 15:16:08', 14, 15, 10, 15, 1),
('2025-02-26 12:46:40', 10, 11, 11, 23, 3),
('2024-10-22 11:13:21', 15, 16, 12, 7, 3),
('2025-03-26 22:24:16', 15, 16, 12, 10, 1),
('2024-10-28 14:49:37', 5, 6, 13, 9, 2),
('2024-10-18 14:57:38', 14, 15, 14, 3, 3),
('2025-02-18 01:26:24', 14, 15, 15, 14, 3),
('2024-10-25 19:16:09', 14, 15, 15, 2, 3),
('2025-02-13 03:45:00', 11, 12, 16, 4, 1),
('2024-12-06 12:38:29', 14, 15, 17, 20, 3),
('2024-12-24 01:51:29', 14, 15, 17, 23, 1),
('2024-12-22 11:56:15', 14, 15, 17, 11, 1),
('2025-03-06 21:26:42', 13, 14, 18, 11, 3),
('2024-12-13 05:47:14', 6, 7, 19, 1, 2),
('2024-12-24 00:10:31', 6, 7, 19, 16, 3),
('2024-12-31 16:27:13', 6, 7, 19, 25, 2),
('2024-10-15 10:18:21', 14, 15, 20, 9, 2),
('2024-12-16 05:22:29', 14, 15, 20, 17, 2),
('2024-12-14 21:40:38', 14, 15, 20, 23, 2),
('2025-01-19 14:55:04', 11, 12, 21, 6, 2),
('2025-02-09 20:03:38', 10, 11, 22, 6, 3),
('2025-02-28 00:19:21', 10, 11, 22, 21, 2),
('2024-11-18 11:34:04', 5, 6, 23, 22, 2),
('2024-10-20 12:48:18', 13, 14, 24, 7, 3),
('2025-02-04 17:33:46', 13, 14, 24, 4, 1),
('2024-10-26 16:12:01', 13, 14, 24, 9, 1),
('2024-12-14 08:17:41', 13, 14, 25, 21, 2),
('2025-02-14 01:25:32', 13, 14, 25, 7, 2),
('2025-02-07 16:49:10', 13, 14, 25, 5, 1),
('2024-12-26 13:39:39', 11, 12, 26, 14, 2),
('2024-11-12 16:54:44', 11, 12, 26, 13, 1),
('2024-12-10 13:54:36', 11, 12, 26, 7, 1),
('2025-02-24 05:22:08', 14, 15, 27, 11, 1),
('2024-12-13 06:57:13', 14, 15, 27, 11, 2),
('2024-12-09 16:37:44', 14, 15, 27, 12, 2),
('2024-11-06 18:19:26', 13, 14, 28, 13, 3),
('2025-02-01 21:35:36', 8, 9, 29, 4, 3),
('2025-01-29 11:57:18', 8, 9, 29, 25, 3),
('2025-02-10 20:12:42', 7, 8, 30, 24, 1),
('2024-11-21 22:07:09', 7, 8, 30, 12, 1),
('2024-10-02 12:04:26', 5, 6, 31, 6, 2),
('2024-12-27 17:02:31', 5, 6, 31, 3, 2),
('2025-03-08 12:38:03', 6, 7, 32, 7, 2),
('2024-10-17 12:44:38', 6, 7, 32, 4, 3),
('2024-12-15 18:20:35', 6, 7, 32, 4, 3),
('2025-01-11 23:02:35', 14, 15, 33, 8, 3),
('2024-10-26 09:47:43', 14, 15, 33, 22, 3),
('2025-01-25 14:59:15', 12, 13, 34, 14, 1),
('2025-02-23 16:55:10', 12, 13, 34, 9, 2),
('2024-12-08 17:31:53', 12, 13, 34, 1, 1),
('2025-01-15 01:20:22', 7, 8, 35, 22, 1),
('2024-12-11 18:28:01', 7, 8, 35, 12, 2),
('2024-12-20 10:44:17', 6, 7, 36, 23, 1),
('2025-02-06 09:38:47', 6, 7, 36, 3, 1),
('2025-03-19 00:42:28', 9, 10, 37, 24, 2),
('2025-03-30 07:14:11', 14, 15, 38, 19, 1),
('2024-12-29 14:52:29', 14, 15, 38, 13, 1),
('2024-11-18 00:30:36', 14, 15, 38, 19, 3),
('2025-01-24 18:46:44', 5, 6, 39, 9, 3),
('2025-03-19 15:56:32', 5, 6, 39, 11, 2),
('2024-10-21 14:19:00', 11, 12, 40, 11, 3),
('2025-02-11 08:43:27', 11, 12, 40, 17, 2),
('2024-12-14 19:03:28', 11, 12, 40, 20, 1),
('2024-11-04 01:29:48', 7, 8, 41, 6, 2),
('2025-01-05 20:46:43', 7, 8, 41, 5, 2),
('2024-10-07 08:55:31', 12, 13, 42, 17, 2),
('2024-11-10 07:24:05', 12, 13, 42, 16, 2),
('2025-03-26 16:04:32', 12, 13, 42, 20, 1),
('2024-10-05 21:01:00', 13, 14, 43, 24, 1),
('2025-03-26 15:50:04', 13, 14, 43, 2, 1),
('2024-12-31 23:22:26', 8, 9, 44, 12, 1),
('2024-10-21 20:23:07', 8, 9, 44, 21, 1),
('2025-02-04 15:39:22', 13, 14, 45, 11, 1),
('2025-02-28 14:52:56', 13, 14, 45, 25, 3),
('2025-03-16 22:50:13', 11, 12, 46, 12, 1),
('2025-03-28 01:41:44', 15, 16, 47, 7, 2),
('2025-02-19 21:18:37', 15, 16, 47, 4, 2),
('2024-10-27 21:51:47', 12, 13, 48, 11, 1),
('2024-12-24 17:03:18', 5, 6, 49, 4, 2),
('2024-10-30 21:06:36', 5, 6, 49, 1, 2),
('2025-02-22 05:51:39', 11, 12, 50, 5, 1),
('2024-12-21 03:39:08', 11, 12, 50, 15, 1);

INSERT INTO inventory_transactions (product_ID, requested_to, requested_by, quantity, processed, Time) VALUES
(2, 2, 18, 8, 'completed', '2024-11-18 14:30:00'),
(3, 3, 19, 7, 'completed', '2024-11-22 11:45:00'),
(4, 4, 20, 6, 'completed', '2024-11-25 16:10:00'),
(5, 1, 21, 9, 'completed', '2024-12-01 13:20:00'),
(6, 2, 22, 6, 'completed', '2024-12-05 12:25:00'),
(7, 3, 23, 8, 'completed', '2024-12-08 14:00:00'),
(8, 4, 24, 5, 'completed', '2024-12-12 16:30:00'),
(9, 1, 25, 7, 'completed', '2024-12-15 17:45:00'),
(10, 2, 26, 9, 'completed', '2024-12-18 10:15:00'),
(11, 3, 27, 10, 'completed', '2024-12-22 08:20:00'),
(12, 4, 28, 6, 'completed', '2024-12-26 12:00:00'),
(13, 1, 29, 8, 'completed', '2025-01-01 13:40:00'),
(14, 2, 30, 5, 'completed', '2025-01-04 11:30:00'),
(15, 3, 31, 10, 'completed', '2025-01-08 09:55:00'),
(17, 2, 18, 9, 'completed', '2025-01-15 10:40:00'),
(18, 3, 19, 7, 'completed', '2025-01-18 16:00:00'),
(19, 4, 20, 5, 'completed', '2025-01-22 11:30:00'),
(20, 1, 21, 6, 'completed', '2025-01-25 12:00:00'),
(21, 2, 22, 10, 'completed', '2025-01-28 13:00:00'),
(22, 3, 23, 9, 'completed', '2025-02-01 14:15:00'),
(23, 4, 24, 5, 'completed', '2025-02-04 15:45:00'),
(24, 1, 25, 7, 'completed', '2025-02-07 16:30:00'),
(1, 2, 26, 6, 'completed', '2025-02-10 13:25:00'),
(2, 3, 27, 9, 'completed', '2025-02-14 17:10:00'),
(3, 4, 28, 7, 'completed', '2025-02-17 10:50:00'),
(4, 1, 29, 8, 'completed', '2025-02-20 11:00:00'),
(5, 2, 30, 5, 'completed', '2025-02-24 12:30:00'),
(6, 3, 31, 9, 'completed', '2025-02-27 13:20:00'),
(8, 1, 18, 10, 'completed', '2025-03-06 14:30:00'),
(9, 2, 19, 8, 'completed', '2025-03-10 11:15:00'),
(10, 3, 20, 7, 'completed', '2025-03-13 15:45:00'),
(11, 4, 21, 5, 'completed', '2025-03-17 13:30:00'),
(12, 1, 22, 6, 'completed', '2025-03-20 11:00:00'),
(13, 2, 23, 9, 'completed', '2025-03-23 17:50:00'),
(14, 3, 24, 10, 'completed', '2025-03-26 10:20:00'),
(15, 4, 25, 5, 'completed', '2025-03-30 16:00:00'),
(16, 1, 26, 7, 'completed', '2025-03-01 12:10:00'),
(17, 2, 27, 8, 'completed', '2025-03-04 14:50:00'),
(18, 3, 28, 10, 'completed', '2025-03-07 15:30:00'),
(19, 4, 29, 6, 'completed', '2025-03-10 11:00:00'),
(20, 1, 30, 9, 'completed', '2025-03-13 13:40:00'),
(21, 2, 31, 7, 'completed', '2025-03-16 14:25:00'),
(23, 4, 18, 8, 'completed', '2025-03-22 16:00:00'),
(24, 1, 19, 5, 'completed', '2025-03-25 13:15:00'),
(1, 2, 20, 9, 'completed', '2025-03-28 14:00:00'),
(2, 3, 21, 7, 'completed', '2025-03-31 15:45:00'),
(3, 4, 22, 10, 'completed', '2025-03-03 16:30:00'),
(4, 1, 23, 5, 'completed', '2025-03-06 12:15:00'),
(5, 2, 24, 6, 'completed', '2025-03-09 13:00:00'),
(6, 3, 25, 10, 'completed', '2025-03-12 14:25:00'),
(7, 4, 26, 8, 'completed', '2025-03-15 15:40:00'),
(8, 1, 27, 7, 'completed', '2025-03-18 10:00:00'),
(9, 2, 28, 10, 'completed', '2025-03-21 13:25:00'),
(10, 3, 29, 6, 'completed', '2025-03-24 12:30:00'),
(11, 4, 30, 9, 'completed', '2025-03-27 11:45:00'),
(12, 1, 31, 10, 'completed', '2025-03-30 14:00:00'),
(14, 3, 18, 7, 'completed', '2025-03-05 11:30:00'),
(15, 4, 19, 8, 'completed', '2025-03-08 12:50:00'),
(16, 1, 20, 10, 'completed', '2025-03-11 15:00:00'),
(17, 2, 21, 9, 'completed', '2025-03-14 10:20:00'),
(18, 3, 22, 6, 'completed', '2025-03-17 13:15:00'),
(19, 4, 23, 7, 'completed', '2025-03-20 15:30:00'),
(20, 1, 24, 8, 'completed', '2025-03-23 16:00:00'),
(21, 2, 25, 5, 'completed', '2025-03-26 14:30:00');

-- data for factory orders
INSERT INTO factory_orders (product_ID, ordered_by, quantity, processed) VALUES
(1, 1+1, 10, TRUE),
(2, 2+1, 15, TRUE),
(3, 3+1, 20, TRUE),
(4, 4+1, 5, TRUE),
(5, 1+1, 12, TRUE),
(6, 2+1, 8, TRUE),
(7, 3+1, 18, TRUE),
(8, 4+1, 25, TRUE),
(9, 1+1, 7, TRUE),
(10, 2+1, 30, TRUE),
(11, 3+1, 22, TRUE),
(12, 4+1, 14, TRUE),
(13, 1+1, 6, TRUE),
(14, 2+1, 9, TRUE),
(15, 3+1, 11, TRUE),
(16, 4+1, 16, TRUE),
(17, 1+1, 13, TRUE),
(18, 2+1, 27, TRUE),
(19, 3+1, 19, TRUE),
(20, 4+1, 21, TRUE),
(21, 1+1, 23, TRUE),
(22, 2+1, 24, TRUE),
(23, 3+1, 17, TRUE),
(24, 4+1, 29, TRUE),
(25, 1+1, 31, TRUE),
(5, 2+1, 9, TRUE),
(10, 3+1, 14, TRUE),
(15, 4+1, 20, TRUE),
(20, 1+1, 26, TRUE),
(25, 2+1, 28, TRUE);

