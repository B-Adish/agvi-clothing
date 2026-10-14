require("dotenv").config();

const express = require("express");
const cors = require("cors");
const pool = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
    })
);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

// Basic backend health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "AGVI Clothing backend is running",
    });
});

// Test MySQL connection
app.get("/api/db-check", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT DATABASE() AS database_name, VERSION() AS mysql_version"
        );

        res.status(200).json({
            success: true,
            message: "MySQL connected successfully",
            database: rows[0].database_name,
            mysqlVersion: rows[0].mysql_version,
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);

        res.status(500).json({
            success: false,
            message: "Database connection failed. Check backend configuration.",
        });
    }
});

app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);

// Handle unknown API routes
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API endpoint not found",
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`AGVI backend running at http://localhost:${PORT}`);
});