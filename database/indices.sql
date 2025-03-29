CREATE INDEX idx_inventory_transactions_time ON inventory_transactions (Time);
CREATE INDEX idx_factory_orders_time ON factory_orders (order_time);
CREATE INDEX idx_sales_time ON sales (sale_time);
CREATE INDEX idx_alerts_time ON alerts (triggerd_time);

CREATE INDEX idx_employee_id ON employee (employee_ID) USING HASH;
CREATE INDEX idx_product_id ON product (product_ID) USING HASH;
CREATE INDEX idx_facility_id ON facility (facility_ID) USING HASH;
CREATE INDEX idx_stock_facility_product ON stock (facility_ID, product_ID) USING HASH;