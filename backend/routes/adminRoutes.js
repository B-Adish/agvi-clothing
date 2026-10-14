
const express = require("express");

const {
    loginAdmin
} = require("../controllers/adminController");

const {
    getAdminProducts,
    createProduct,
    updateProduct,
    deleteProduct
} = require("../controllers/adminProductController");

const adminAuth = require("../middleware/adminAuth");

const router = express.Router();

// Admin login
router.post("/login", loginAdmin);

// Verify admin token
router.get("/verify", adminAuth, (req, res) => {
    res.status(200).json({
        success: true,
        message: "Admin authentication verified.",
        admin: {
            id: req.admin.id,
            username: req.admin.username,
            role: req.admin.role
        }
    });
});

// Protected product management routes
router.get("/products", adminAuth, getAdminProducts);
router.post("/products", adminAuth, createProduct);
router.put("/products/:id", adminAuth, updateProduct);
router.delete("/products/:id", adminAuth, deleteProduct);

module.exports = router;
