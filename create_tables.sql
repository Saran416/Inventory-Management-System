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

    INSERT INTO employee (employee_name, position, works_in, password)
    VALUES ('admin1', 'admin', NULL, '$2b$10$rREnrqYS97P5ycjz6CNCNejzq1rrVrLbntroJJlItrnBJIphQALN6');


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
        product_ID BIGINT UNSIGNED REFERENCES product(product_ID) ON DELETE SET NULL,
        requested_to BIGINT UNSIGNED REFERENCES facility(facility_ID) ON DELETE SET NULL,
        requested_by BIGINT UNSIGNED REFERENCES employee(employee_ID) ON DELETE SET NULL,
        quantity INT NOT NULL,
        processed BOOLEAN NOT NULL DEFAULT FALSE
    );

    -- Create Factory Orders Table
    CREATE TABLE factory_orders (
        order_ID SERIAL PRIMARY KEY,
        order_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        product_ID BIGINT UNSIGNED REFERENCES product(product_ID) ON DELETE CASCADE,
        ordered_by BIGINT UNSIGNED REFERENCES employee(employee_ID) ON DELETE SET NULL,
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
        facility_ID BIGINT UNSIGNED REFERENCES facility(facility_ID) ON DELETE SET NULL,
        employee_ID BIGINT UNSIGNED REFERENCES employee(employee_ID) ON DELETE SET NULL,
        customer_ID BIGINT UNSIGNED REFERENCES customer(customer_ID) ON DELETE SET NULL,
        product_ID BIGINT UNSIGNED REFERENCES product(product_ID) ON DELETE SET NULL,
        quantity INT NOT NULL
    );

    -- Adding Constraints
    ALTER TABLE product ADD CONSTRAINT positive_price CHECK (price >= 0);
    ALTER TABLE sales ADD CONSTRAINT sales_positive_quantity CHECK (quantity > 0);
    ALTER TABLE factory_orders ADD CONSTRAINT factory_orders_positive_quantity CHECK (quantity > 0);
    ALTER TABLE inventory_transactions ADD CONSTRAINT inventory_transactions_positive_quantity CHECK (quantity > 0);
    ALTER TABLE stock ADD CONSTRAINT stock_positive_quantity CHECK (quantity > 0);
    ALTER TABLE stock ADD CONSTRAINT positive_reorder_level CHECK (reorder_level > 0);