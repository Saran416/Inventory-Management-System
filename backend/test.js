const bcrypt = require("bcryptjs");
bcrypt.hash("admin1pass", 10).then(console.log);

