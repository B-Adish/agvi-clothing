const pool = require("../config/db");

const getProducts = async (req, res) => {
    try {
        const {
            category,
            subcategory,
            availability,
            featured,
            newArrival,
        } = req.query;

        let sql = `
            SELECT
                id,
                name,
                description,
                COALESCE(sale_price, price) AS price,
                category,
                subcategory,
                availability,
                stock,
                image_url AS imageUrl,
                is_featured AS isFeatured,
                is_new_arrival AS isNewArrival
            FROM products
            WHERE is_active = TRUE
        `;

        const params = [];

        if (category) {
            sql += " AND category = ?";
            params.push(category);
        }

        if (subcategory) {
            sql += " AND subcategory = ?";
            params.push(subcategory);
        }

        if (availability) {
            sql += " AND availability = ?";
            params.push(availability);
        }

        if (featured === "true") {
            sql += " AND is_featured = TRUE";
        }

        if (newArrival === "true") {
            sql += " AND is_new_arrival = TRUE";
        }

        sql += " ORDER BY created_at DESC";

        const [products] = await pool.query(sql, params);

        res.status(200).json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        console.error("Get products error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to retrieve products.",
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const [products] = await pool.execute(
            `SELECT
                id,
                name,
                description,
                COALESCE(sale_price, price) AS price,
                category,
                subcategory,
                availability,
                stock,
                image_url AS imageUrl,
                is_featured AS isFeatured,
                is_new_arrival AS isNewArrival
             FROM products
             WHERE id = ? AND is_active = TRUE`,
            [req.params.id]
        );

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found.",
            });
        }

        res.status(200).json({
            success: true,
            product: products[0],
        });
    } catch (error) {
        console.error("Get product error:", error.message);

        res.status(500).json({
            success: false,
            message: "Unable to retrieve product.",
        });
    }
};

module.exports = {
    getProducts,
    getProductById,
};