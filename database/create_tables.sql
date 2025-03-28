-- Create Facility Table
CREATE TABLE facility (
    facility_ID SERIAL PRIMARY KEY,
    type VARCHAR(20),
    location TEXT,
    coordinates TEXT
);

-- Create Employee Table
CREATE TABLE employee (
    employee_ID SERIAL PRIMARY KEY,
    employee_name VARCHAR(50) UNIQUE NOT NULL,
    position VARCHAR(20) NOT NULL,
    works_in BIGINT UNSIGNED NULL,
    password TEXT NOT NULL,
    FOREIGN KEY (works_in) REFERENCES facility(facility_ID) ON DELETE SET NULL
);

-- Create Brand Table
CREATE TABLE brand (
    brand_name VARCHAR(50) PRIMARY KEY,
    contact_info TEXT
);

-- Create Category Table
CREATE TABLE category (
    category_ID SERIAL PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL
);

-- Create Product Table
CREATE TABLE product (
    product_ID SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_ID BIGINT UNSIGNED NOT NULL,
    brand_name VARCHAR(50) NOT NULL,
    FOREIGN KEY (category_ID) REFERENCES category(category_ID) ON DELETE CASCADE,
    FOREIGN KEY (brand_name) REFERENCES brand(brand_name) ON DELETE CASCADE
);



-- Create Stock Table
CREATE TABLE stock (
    product_ID BIGINT UNSIGNED NOT NULL,
    facility_ID BIGINT UNSIGNED NOT NULL,
    quantity INT NOT NULL,
    reorder_level INT NOT NULL,
    PRIMARY KEY (product_ID, facility_ID),
    FOREIGN KEY (product_ID) REFERENCES product(product_ID) ON DELETE CASCADE,
    FOREIGN KEY (facility_ID) REFERENCES facility(facility_ID) ON DELETE CASCADE
);

-- Create Inventory Transactions Table
CREATE TABLE inventory_transactions (
    transaction_ID SERIAL PRIMARY KEY,
    Time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    product_ID BIGINT UNSIGNED REFERENCES product(product_ID) ON DELETE CASCADE,
    requested_to BIGINT UNSIGNED REFERENCES facility(facility_ID) ON DELETE CASCADE,
    requested_by BIGINT UNSIGNED REFERENCES employee(employee_ID) ON DELETE CASCADE,
    quantity INT NOT NULL,
    processed ENUM('sent', 'accepted', 'completed') NOT NULL
);

-- Create Factory Orders Table
CREATE TABLE factory_orders (
    order_ID SERIAL PRIMARY KEY,
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    product_ID BIGINT UNSIGNED REFERENCES product(product_ID) ON DELETE CASCADE,
    ordered_by BIGINT UNSIGNED REFERENCES employee(employee_ID) ON DELETE CASCADE,
    quantity INT NOT NULL,
    processed BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create Customer Table
CREATE TABLE customer (
    customer_ID SERIAL PRIMARY KEY,
    customer_name VARCHAR(50) NOT NULL,
    mobile VARCHAR(15) UNIQUE NOT NULL
);

-- Create Sales Table
CREATE TABLE sales (
    sale_ID SERIAL PRIMARY KEY,
    sale_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    facility_ID BIGINT UNSIGNED REFERENCES facility(facility_ID) ON DELETE CASCADE,
    employee_ID BIGINT UNSIGNED REFERENCES employee(employee_ID) ON DELETE CASCADE,
    customer_ID BIGINT UNSIGNED REFERENCES customer(customer_ID) ON DELETE CASCADE,
    product_ID BIGINT UNSIGNED REFERENCES product(product_ID) ON DELETE CASCADE,
    quantity INT NOT NULL
);

-- Create Alerts Table
CREATE TABLE alerts (
    alert_ID SERIAL PRIMARY KEY,
    triggerd_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    facility_ID BIGINT UNSIGNED REFERENCES facility(facility_ID) ON DELETE CASCADE,
    product_ID BIGINT UNSIGNED REFERENCES product(product_ID) ON DELETE CASCADE
);

-- Adding Constraints
ALTER TABLE product ADD CONSTRAINT positive_price CHECK (price >= 0);
ALTER TABLE sales ADD CONSTRAINT sales_positive_quantity CHECK (quantity > 0);
ALTER TABLE factory_orders ADD CONSTRAINT factory_orders_positive_quantity CHECK (quantity > 0);
ALTER TABLE inventory_transactions ADD CONSTRAINT inventory_transactions_positive_quantity CHECK (quantity > 0);
ALTER TABLE stock ADD CONSTRAINT stock_positive_quantity CHECK (quantity > 0);
ALTER TABLE stock ADD CONSTRAINT positive_reorder_level CHECK (reorder_level > 0);


-- ALL THE FUNCTIONS

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

-- ALL THE STORED PROCEDURES

-- processing sales
DELIMITER $$

CREATE PROCEDURE process_sale(
    IN p_customer_name VARCHAR(50),
    IN p_customer_number VARCHAR(15),
    IN p_product_id BIGINT UNSIGNED,
    IN p_quantity INT,
    IN p_employee_id BIGINT UNSIGNED
)
BEGIN
    DECLARE v_customer_id BIGINT;
    DECLARE v_facility_id BIGINT;
    DECLARE v_existing_stock INT;

    -- Check if the customer already exists
    SELECT customer_ID INTO v_customer_id
    FROM customer
    WHERE customer_name = p_customer_name AND mobile = p_customer_number
    LIMIT 1;

    -- If the customer does not exist, insert them
    IF v_customer_id IS NULL THEN
        INSERT INTO customer (customer_name, mobile) 
        VALUES (p_customer_name, p_customer_number);
        SET v_customer_id = LAST_INSERT_ID();
    END IF;

    -- Get the facility where the employee works
    SELECT works_in INTO v_facility_id
    FROM employee
    WHERE employee_ID = p_employee_id;

    -- Check current stock for the product in the facility
    SELECT quantity INTO v_existing_stock
    FROM stock
    WHERE product_ID = p_product_id AND facility_ID = v_facility_id
    LIMIT 1;

    -- Update stock
    UPDATE stock
    SET quantity = quantity - p_quantity
    WHERE product_ID = p_product_id AND facility_ID = v_facility_id;

    -- Insert into sales table
    INSERT INTO sales (facility_ID, employee_ID, customer_ID, product_ID, quantity)
    VALUES (v_facility_id, p_employee_id, v_customer_id, p_product_id, p_quantity);
    
END $$

DELIMITER ;

-- ALL TRIGGERS

DELIMITER $$

-- updating the alert table
CREATE TRIGGER stock_alert_trigger
AFTER UPDATE ON stock
FOR EACH ROW
BEGIN
    IF NEW.quantity < NEW.reorder_level THEN
        INSERT INTO alerts (facility_ID, product_ID)
        VALUES (NEW.facility_ID, NEW.product_ID, FALSE);
    END IF;
END $$

DELIMITER ;
