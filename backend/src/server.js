const express = require("express");
const cors = require("./middlewares/corsMiddleware");
const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const facilityRoutes = require("./routes/facilityRoutes");
const salesRoutes = require("./routes/salesRoutes");
const stockRoutes = require("./routes/stockRoutes");
const customerRoutes = require("./routes/customerRoutes");
const brandRoutes = require("./routes/brandRoutes");
const productRoutes = require("./routes/productRoutes");
const transactionRoutes = require("./routes/transactionsRoutes");

const app = express();

app.use(express.json());
app.use(cors);

app.use("/api/auth", authRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/facility", facilityRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/stock", stockRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/brand", brandRoutes);
app.use("/api/product", productRoutes);
app.use("/api/transactions", transactionRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
