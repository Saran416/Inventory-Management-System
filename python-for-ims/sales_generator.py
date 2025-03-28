import random
from datetime import datetime, timedelta

# Define the valid store facilities and corresponding store employees
store_facilities = {
   5:  'Neha Sharma',
   6:  'Pooja Verma',
   7:  'Vikram Singh',
   8:  'Rohan Das',
   9:  'Alok Mehta',
   10: 'Sneha Iyer',
   11: 'Manoj Pillai',
   12: 'Deepak Nair',
   13: 'Asha Menon',
   14: 'Rahul Bose',
   15: 'Kiran Rao'
}

store_employees = {
   'Neha Sharma': 6,
   'Pooja Verma': 7,
   'Vikram Singh': 8,
   'Rohan Das': 9,
   'Alok Mehta': 10,
   'Sneha Iyer': 11,
   'Manoj Pillai': 12,
   'Deepak Nair': 13,
   'Asha Menon': 14,
   'Rahul Bose': 15,
   'Kiran Rao': 16
}

# Define customer and product IDs
customer_ids = list(range(1, 51))  # 50 customers
product_ids = list(range(1, 26))   # 25 products

# Define the sale period (Oct 2024 - Mar 2025)
start_date = datetime(2024, 10, 1)
end_date = datetime(2025, 3, 31)
total_days = (end_date - start_date).days

# Generate sales records
sales_data = []
for customer_id in customer_ids:
    facility_id = random.choice(list(store_facilities.keys()))  # Each customer shops at one store
    employee_id = store_employees[store_facilities[facility_id]]  # Get corresponding store manager

    for _ in range(random.randint(1, 3)):  # Each customer makes 1-3 purchases
        product_id = random.choice(product_ids)
        quantity = random.randint(1, 3)
        sale_time = start_date + timedelta(days=random.randint(0, total_days),
                                           hours=random.randint(0, 23),
                                           minutes=random.randint(0, 59),
                                           seconds=random.randint(0, 59))
        
        sales_data.append(f"('{sale_time.strftime('%Y-%m-%d %H:%M:%S')}', {facility_id}, {employee_id}, {customer_id}, {product_id}, {quantity})")

# Prepare SQL Insert Statements
sales_insert_statements = "INSERT INTO sales (sale_time, facility_ID, employee_ID, customer_ID, product_ID, quantity) VALUES\n"
sales_insert_statements += ",\n".join(sales_data) + ";"

print(sales_insert_statements)
