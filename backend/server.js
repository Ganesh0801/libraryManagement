const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const adminAuthRoutes = require("./routes/adminAuthRoutes.js");
const adminDashboardRoutes = require("./routes/adminDashboardRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const bookRoutes = require("./routes/bookRoutes.js");

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));