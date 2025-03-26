const bcrypt = require("bcryptjs");
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL successfully!');
    connection.release(); 
  } catch (err) {
    console.error('❌ Error connecting to MySQL:', err.message);
  }
}

testConnection();

const employees = [
    { name: 'John Doe', position: 'warehouse_manager', works_in: 1, password: 'pass123' },
    { name: 'Jane Smith', position: 'warehouse_employee', works_in: 1, password: 'pass123' },
    { name: 'Robert Brown', position: 'warehouse_employee', works_in: 2, password: 'pass123' },
    { name: 'Alice Johnson', position: 'store_manager', works_in: 3, password: 'pass123' },
    { name: 'Charlie Lee', position: 'store_employee', works_in: 3, password: 'pass123' },
    { name: 'Emma Davis', position: 'store_manager', works_in: 4, password: 'pass123' },
    { name: 'Liam Wilson', position: 'store_employee', works_in: 4, password: 'pass123' },
    { name: 'Admin User', position: 'admin', works_in: null, password: 'adminpass' },
];

async function insertEmployees() {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        for (const employee of employees) {
            const hashedPassword = await bcrypt.hash(employee.password, 10);
            await connection.query(
                'INSERT INTO employee (employee_name, position, works_in, password) VALUES (?, ?, ?, ?)',
                [employee.name, employee.position, employee.works_in, hashedPassword]
            );
        }
        await connection.commit();
        console.log('✅ Employees inserted successfully!');
    } catch (err) {
        await connection.rollback();
        console.error('❌ Error inserting employees:', err.message);
    } finally {
        connection.release();
    }
}

insertEmployees();


console.log("fdsf")
bcrypt.hash("admin1pass", 10).then(console.log);

