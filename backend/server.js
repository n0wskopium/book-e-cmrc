require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectMongo = require("./config/db-mongo");
const mysqlConnection = require("./config/db-mysql"); // This auto-connects on import
const orderRoutes = require("./routes/orderRoutes");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB for orders
connectMongo();

// Optional: Test MySQL connection by running a simple query
mysqlConnection.query("SELECT 1", (err, results) => {
  if (err) {
    console.error("❌ MySQL connection test failed:", err);
  } else {
    console.log("✅ MySQL connection is working");
  }
});

// API Routes
app.use("/api/orders", orderRoutes);  // MongoDB-based routes (orders)
app.use("/api/books", bookRoutes);      // MySQL-based routes (books)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
