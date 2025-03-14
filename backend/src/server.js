const express = require("express");
const cors = require("./middlewares/corsMiddleware");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const facilityRoutes = require("./routes/facilityRoutes");

const app = express();

app.use(express.json());
app.use(cors);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employee", userRoutes);
app.use("/api/facility", facilityRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
