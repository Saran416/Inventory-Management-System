const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

const users = {
  admin: { password: "admin", position: "admin" },
  supervisor: { password: "supervisor", position: "supervisor" },
  employee: { password: "employee", position: "employee" },
};

const userInfo = {
  admin: "Admin panel access",
  supervisor: "Can review reports",
  employee: "Regular employee dashboard",
};

// GET /hello
app.get("/hello", (req, res) => {
  res.json({ text: "Hello, World!" });
});

// POST /post
app.post("/post", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Invalid JSON" });
  }
  res.json({ text: `Received: ${text}` });
});

// POST /api/login
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (users[username] && users[username].password === password) {
    res.json({ success: true, position: users[username].position });
  } else {
    res.json({ success: false });
  }
});

// GET /api/user/:username
app.get("/api/user/:username", (req, res) => {
  const { username } = req.params;
  if (users[username]) {
    res.json({ username, info: userInfo[users[username].position] });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// GET /api/user-position/:username
app.get("/api/user-position/:username", (req, res) => {
  const { username } = req.params;
  if (users[username]) {
    res.json({ success: true, position: users[username].position });
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Start server
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

