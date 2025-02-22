const express = require("express");
const router = express.Router();
const mysqlConnection = require("../config/db-mysql");

// Endpoint to get latest books (e.g., last 5 added)
router.get("/latest", (req, res) => {
    mysqlConnection.query("SELECT * FROM books WHERE featured =0 LIMIT 5", (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});

// Endpoint to get featured books (e.g., books marked as 'featured')
router.get("/featured", (req, res) => {
    mysqlConnection.query("SELECT * FROM books WHERE featured = 1 LIMIT 5", (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});

module.exports = router;
