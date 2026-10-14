
const pool = require("../config/db");

const allowedAvailability = [
    "Made to Order",
    "Immediate Dispatch",
    "Not Applicable"
];

const getAdminProducts = async (req, res) => {
    try {
        const [products] = await pool.query(`
            SELECT
                id,
                name,
                description,
                price,
                sale_price AS salePrice,
                category,
                subcategory,
                availability,
                stock,
                sizes,
                colors,
                image_url AS imageUrl,
                is_featured AS isFeatured,
                is_new_arrival AS isNewArrival,
                is_active AS isActive,
                created_at AS createdAt
            FROM products
            ORDER BY created_at DESC
        `);

        res.json({
            success: true,
            count: products.length,
            products
        });
    } catch (error) {
        console.error("Admin product fetch error:", error.message);
        res.status(500).json({
            success: false,
            message: "Could not fetch products."
        });
    }
};

const createProduct = async (req, res) => {
    try {
        const {
            name,
            description = "",
            price,
            salePrice = null,
            category,
            subcategory = null,
            availability = "Immediate Dispatch",
            stock = 0,
            sizes = null,
            colors = null,
            imageUrl = null,
            isFeatured = false,
            isNewArrival = false
        } = req.body;

        if (
            typeof name !== "string" ||
            !name.trim() ||
            !category ||
            price === undefined ||
            price === null ||
            price === "" ||
            !Number.isFinite(Number(price)) ||
            Number(price) < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Name, category and a valid price are required."
            });
        }

        if (
            salePrice !== null &&
            salePrice !== "" &&
            (!Number.isFinite(Number(salePrice)) ||
                Number(salePrice) < 0 ||
                Number(salePrice) > Number(price))
        ) {
            return res.status(400).json({
                success: false,
                message: "Sale price must be valid and cannot exceed the regular price."
            });
        }
        if (
            typeof name !== "string" ||
            !name.trim() ||
            !category ||
            typeof subcategory !== "string" ||
            !subcategory.trim() ||
            price === undefined ||
            price === null ||
            price === "" ||
            !Number.isFinite(Number(price)) ||
            Number(price) < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Name, category, subcategory and a valid price are required."
            });
        }

        if (
            !allowedAvailability.includes(availability) ||
            !Number.isInteger(Number(stock)) ||
            Number(stock) < 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid availability or stock quantity."
            });
        }

        const [result] = await pool.execute(
            `INSERT INTO products (
                name, description, price, sale_price,
                category, subcategory, availability, stock,
                sizes, colors, image_url,
                is_featured, is_new_arrival
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name.trim(),
                description,
                Number(price),
                salePrice === null || salePrice === ""
                    ? null
                    : Number(salePrice),
                category.trim(),
                subcategory || null,
                availability,
                Number(stock),
                sizes == null ? null : JSON.stringify(sizes),
                colors == null ? null : JSON.stringify(colors),
                imageUrl || null,
                Boolean(isFeatured),
                Boolean(isNewArrival)
            ]
        );

        res.status(201).json({
            success: true,
            message: "Product created successfully.",
            productId: result.insertId
        });
    } catch (error) {
        console.error("Product creation error:", error.message);
        res.status(500).json({
            success: false,
            message: "Could not create product."
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const allowedFields = {
            name: "name",
            description: "description",
            price: "price",
            salePrice: "sale_price",
            category: "category",
            subcategory: "subcategory",
            availability: "availability",
            stock: "stock",
            sizes: "sizes",
            colors: "colors",
            imageUrl: "image_url",
            isFeatured: "is_featured",
            isNewArrival: "is_new_arrival",
            isActive: "is_active"
        };

        const fields = [];
        const values = [];

        for (const [key, column] of Object.entries(allowedFields)) {
            if (Object.prototype.hasOwnProperty.call(req.body, key)) {
                let value = req.body[key];

                if (key === "name" || key === "category") {
                    if (typeof value !== "string" || !value.trim()) {
                        return res.status(400).json({
                            success: false,
                            message: `${key} cannot be empty.`
                        });
                    }
                    value = value.trim();
                }

                if (key === "availability" &&
                    !allowedAvailability.includes(value)) {
                    return res.status(400).json({
                        success: false,
                        message: "Invalid availability."
                    });
                }

                if (key === "price" || key === "salePrice") {
                    if (
                        value !== null &&
                        (value === "" ||
                            !Number.isFinite(Number(value)) ||
                            Number(value) < 0)
                    ) {
                        return res.status(400).json({
                            success: false,
                            message: `Invalid ${key}.`
                        });
                    }

                    if (value !== null) value = Number(value);
                }

                if (key === "stock") {
                    if (!Number.isInteger(Number(value)) ||
                        Number(value) < 0) {
                        return res.status(400).json({
                            success: false,
                            message: "Stock must be a non-negative integer."
                        });
                    }
                    value = Number(value);
                }

                if (["sizes", "colors"].includes(key)) {
                    value = value == null ? null : JSON.stringify(value);
                }

                if (["isFeatured", "isNewArrival", "isActive"].includes(key)) {
                    if (typeof value !== "boolean" &&
                        value !== 0 && value !== 1) {
                        return res.status(400).json({
                            success: false,
                            message: `Invalid ${key} value.`
                        });
                    }
                    value = Boolean(value);
                }

                fields.push(`${column} = ?`);
                values.push(value);
            }
        }

        if (fields.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Provide at least one field to update."
            });
        }

        // Validate the final prices, including unchanged database values.
        const [existing] = await pool.execute(
            "SELECT price, sale_price FROM products WHERE id = ?",
            [id]
        );

        if (existing.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        const finalPrice = req.body.price !== undefined
            ? Number(req.body.price)
            : Number(existing[0].price);

        const finalSalePrice = req.body.salePrice !== undefined
            ? req.body.salePrice
            : existing[0].sale_price;

        if (
            finalSalePrice !== null &&
            finalSalePrice !== "" &&
            (!Number.isFinite(Number(finalSalePrice)) ||
                Number(finalSalePrice) < 0 ||
                Number(finalSalePrice) > finalPrice)
        ) {
            return res.status(400).json({
                success: false,
                message: "Sale price cannot exceed the regular price."
            });
        }

        values.push(id);

        await pool.execute(
            `UPDATE products SET ${fields.join(", ")} WHERE id = ?`,
            values
        );

        res.json({
            success: true,
            message: "Product updated successfully."
        });
    } catch (error) {
        console.error("Product update error:", error.message);
        res.status(500).json({
            success: false,
            message: "Could not update product."
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Soft delete: preserve the product record and its order history.
        const [result] = await pool.execute(
            "UPDATE products SET is_active = FALSE WHERE id = ? AND is_active = TRUE",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Active product not found."
            });
        }

        res.json({
            success: true,
            message: "Product deactivated successfully."
        });
    } catch (error) {
        console.error("Product deactivation error:", error.message);
        res.status(500).json({
            success: false,
            message: "Could not deactivate product."
        });
    }
};

module.exports = {
    getAdminProducts,
    createProduct,
    updateProduct,
    deleteProduct
};
