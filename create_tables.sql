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
    works_in INT NULL,
    password TEXT NOT NULL,
    FOREIGN KEY (works_in) REFERENCES facility(facility_ID) ON DELETE SET NULL
);

-- Create Brand Table
CREATE TABLE brand (
    brand_name VARCHAR(50) PRIMARY KEY,
    contact_info TEXT
);

-- Create Product Table
CREATE TABLE product (
    product_ID SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_ID INT NOT NULL,
    brand_ID INT NOT NULL,
    FOREIGN KEY (category_ID) REFERENCES category(category_ID) ON DELETE CASCADE,
    FOREIGN KEY (brand_ID) REFERENCES brand(brand_ID) ON DELETE CASCADE
);

-- Create Category Table
CREATE TABLE category (
    category_ID SERIAL PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL
);

-- Create Stock Table
CREATE TABLE stock (
    product_ID INT NOT NULL,
    facility_ID INT NOT NULL,
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
    product_ID INT REFERENCES product(product_ID) ON DELETE CASCADE,
    requested_to INT REFERENCES facility(facility_ID) ON DELETE CASCADE,
    requested_by INT REFERENCES employee(employee_ID) ON DELETE CASCADE,
    quantity INT NOT NULL,
    processed BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create Factory Orders Table
CREATE TABLE factory_orders (
    order_ID SERIAL PRIMARY KEY,
    order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    product_ID INT REFERENCES product(product_ID) ON DELETE CASCADE,
    ordered_by INT REFERENCES employee(employee_ID) ON DELETE CASCADE,
    quantity INT NOT NULL,
    processed BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create Customer Table
CREATE TABLE customer (
    customer_ID SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    mobile VARCHAR(15) UNIQUE NOT NULL
);

-- Create Sales Table
CREATE TABLE sales (
    sale_ID SERIAL PRIMARY KEY,
    sale_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    facility_ID INT REFERENCES facility(facility_ID) ON DELETE CASCADE,
    employee_ID INT REFERENCES employee(employee_ID) ON DELETE CASCADE,
    customer_ID INT REFERENCES customer(customer_ID) ON DELETE CASCADE,
    product_ID INT REFERENCES product(product_ID) ON DELETE CASCADE,
    quantity INT NOT NULL
);

-- Adding Constraints
ALTER TABLE product ADD CONSTRAINT positive_price CHECK (price >= 0);
ALTER TABLE sales ADD CONSTRAINT positive_quantity CHECK (quantity > 0);
ALTER TABLE factory_orders ADD CONSTRAINT positive_quantity CHECK (quantity > 0);
ALTER TABLE inventory_transactions ADD CONSTRAINT positive_quantity CHECK (quantity > 0);
ALTER TABLE stock ADD CONSTRAINT positive_quantity CHECK (quantity > 0);
ALTER TABLE stock ADD CONSTRAINT positive_reorder_level CHECK (reorder_level > 0);
