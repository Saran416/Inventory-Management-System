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



DELIMITER $$

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


-- place new order to factory for warehouse manager

delimiter //
CREATE PROCEDURE PlaceOrderToFactory(
    IN product_id INT,
    IN order_quantity INT,
    IN employee_id INT
)
BEGIN
    -- Insert into factory_orders table
    INSERT INTO factory_orders (product_ID, quantity, ordered_by, processed)
    VALUES (product_id, order_quantity, employee_id, FALSE);

END //
delimiter ;

-- stored procedureto accept factory order by warehouse manager
DELIMITER $$
CREATE PROCEDURE AcceptFactoryOrder(
    IN order_ID_arg INT
)
BEGIN
    -- Update the factory order to mark it as accepted
    UPDATE factory_orders
    SET processed = 1
    WHERE order_ID = order_ID_arg;

END $$
DELIMITER ;

-- trigger to update stock of warehouse after the factory order is accepted
DELIMITER $$
CREATE TRIGGER update_stock_after_factory_order
AFTER UPDATE ON factory_orders
FOR EACH ROW
BEGIN
    DECLARE v_existing_stock INT;

    IF NEW.processed = 1 AND OLD.processed != 1 THEN
        -- Check current stock for the product in the facility
        SELECT quantity INTO v_existing_stock
        FROM stock
        WHERE product_ID = NEW.product_ID AND facility_ID = GetFacilityByEmployee(NEW.ordered_by)  -- Replace with actual facility ID
        LIMIT 1;

        -- Update stock
        UPDATE stock
        SET quantity = v_existing_stock + NEW.quantity
        WHERE product_ID = NEW.product_ID AND facility_ID = GetFacilityByEmployee(NEW.ordered_by);  -- Replace with actual facility ID
    END IF;
END $$
DELIMITER ;

-- mark inventory transaction as accepted
DELIMITER $$
CREATE PROCEDURE MarkTransactionAsAccepted(
    IN transaction_ID_arg INT
)
BEGIN

    -- Update the inventory transaction to mark it as accepted
    UPDATE inventory_transactions
    SET processed = "accepted"
    WHERE transaction_ID = transaction_ID_arg;

END $$
DELIMITER ;
