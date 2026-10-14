import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminProducts.css";

const SIZE_OPTIONS = [
    "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL"
];

const initialForm = {
    name: "",
    description: "",
    price: "",
    salePrice: "",
    category: "Women",
    subcategory: "",
    availability: "Immediate Dispatch",
    stock: "0",
    sizes: [],
    imageUrl: "",
    isFeatured: false,
    isNewArrival: false,
};

function AdminProducts() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [form, setForm] = useState({ ...initialForm });

    const fetchProducts = async () => {
        const token = sessionStorage.getItem("adminToken");

        if (!token) {
            navigate("/admin/login", { replace: true });
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await fetch(
                "http://localhost:5000/api/admin/products",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (response.status === 401 || response.status === 403) {
                sessionStorage.removeItem("adminToken");
                navigate("/admin/login", { replace: true });
                return;
            }

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to load products.");
            }

            setProducts(data.products || []);
        } catch (err) {
            setError(err.message || "Unable to connect to the backend.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const isProductActive = (product) =>
        product.isActive === true || Number(product.isActive) === 1;

    const handleFormChange = (event) => {
        const { name, value, type, checked } = event.target;

        setForm((previous) => ({
            ...previous,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSizeChange = (size) => {
        setForm((previous) => ({
            ...previous,
            sizes: previous.sizes.includes(size)
                ? previous.sizes.filter((item) => item !== size)
                : [...previous.sizes, size],
        }));
    };

    const handleAddProduct = async (event) => {
        event.preventDefault();

        setSaving(true);
        setError("");
        setSuccessMessage("");

        const token = sessionStorage.getItem("adminToken");

        try {
            const response = await fetch(
                "http://localhost:5000/api/admin/products",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...form,
                        price: Number(form.price),
                        salePrice:
                            form.salePrice === ""
                                ? null
                                : Number(form.salePrice),
                        stock: Number(form.stock),
                        sizes: form.sizes,
                    }),
                }
            );

            const data = await response.json();

            if (response.status === 401 || response.status === 403) {
                sessionStorage.removeItem("adminToken");
                navigate("/admin/login", { replace: true });
                return;
            }

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to add product.");
            }

            setForm({ ...initialForm });
            setShowForm(false);
            setSuccessMessage("Product added successfully!");

            await fetchProducts();
        } catch (err) {
            setError(err.message || "Unable to add product.");
        } finally {
            setSaving(false);
        }
    };

    const handleDeactivate = async (product) => {
        const confirmed = window.confirm(
            `Deactivate "${product.name}"? It will no longer appear in the customer store.`
        );

        if (!confirmed) return;

        setError("");
        setSuccessMessage("");

        try {
            const token = sessionStorage.getItem("adminToken");

            const response = await fetch(
                `http://localhost:5000/api/admin/products/${product.id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();

            if (response.status === 401 || response.status === 403) {
                sessionStorage.removeItem("adminToken");
                navigate("/admin/login", { replace: true });
                return;
            }

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Failed to deactivate product.");
            }

            setSuccessMessage("Product deactivated successfully.");
            await fetchProducts();
        } catch (err) {
            setError(err.message || "Unable to deactivate product.");
        }
    };

    return (
        <main className="admin-products-page">
            <header className="admin-products-header">
                <div>
                    <p className="admin-products-eyebrow">AGVI CLOTHING</p>
                    <h1>Product Management</h1>
                    <p className="admin-products-subtitle">
                        View and manage your store inventory.
                    </p>
                </div>

                <div className="admin-products-header-actions">
                    <button
                        type="button"
                        className="admin-products-secondary-btn"
                        onClick={() => navigate("/admin/dashboard")}
                    >
                        Dashboard
                    </button>

                    <button
                        type="button"
                        className="admin-products-primary-btn"
                        onClick={() => {
                            setShowForm((previous) => !previous);
                            setError("");
                            setSuccessMessage("");
                        }}
                    >
                        {showForm ? "Close Form" : "+ Add Product"}
                    </button>
                </div>
            </header>

            {successMessage && (
                <p className="admin-products-success" role="status">
                    {successMessage}
                </p>
            )}

            {error && (
                <div className="admin-products-error" role="alert">
                    <p>{error}</p>
                    <button
                        type="button"
                        className="admin-products-secondary-btn"
                        onClick={() => setError("")}
                    >
                        Dismiss
                    </button>
                </div>
            )}

            {showForm && (
                <section className="admin-products-panel admin-products-form-panel">
                    <h2>Add New Product</h2>

                    <form
                        onSubmit={handleAddProduct}
                        className="admin-product-form"
                    >
                        <label>
                            Product Name *
                            <input
                                name="name"
                                value={form.name}
                                onChange={handleFormChange}
                                required
                            />
                        </label>

                        <label>
                            Description
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleFormChange}
                                rows="3"
                            />
                        </label>

                        <div className="admin-product-form-grid">
                            <label>
                                Regular Price (₹) *
                                <input
                                    name="price"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.price}
                                    onChange={handleFormChange}
                                    required
                                />
                            </label>

                            <label>
                                Sale Price (₹)
                                <input
                                    name="salePrice"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    max={form.price || undefined}
                                    value={form.salePrice}
                                    onChange={handleFormChange}
                                />
                            </label>

                            <label>
                                Category *
                                <input
                                    name="category"
                                    value={form.category}
                                    onChange={handleFormChange}
                                    required
                                />
                            </label>

                            <label>
                                Subcategory *
                                <input
                                    name="subcategory"
                                    value={form.subcategory}
                                    onChange={handleFormChange}
                                    required
                                />
                            </label>

                            <label>
                                Availability *
                                <select
                                    name="availability"
                                    value={form.availability}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <option value="Immediate Dispatch">
                                        Immediate Dispatch
                                    </option>
                                    <option value="Made to Order">
                                        Made to Order
                                    </option>
                                    <option value="Not Applicable">
                                        Not Applicable
                                    </option>
                                </select>
                            </label>

                            <label>
                                Stock Quantity *
                                <input
                                    name="stock"
                                    type="number"
                                    min="0"
                                    step="1"
                                    value={form.stock}
                                    onChange={handleFormChange}
                                    required
                                />
                            </label>
                        </div>

                        <fieldset className="admin-product-size-fieldset">
                            <legend>Available Sizes</legend>
                            <div className="admin-product-size-options">
                                {SIZE_OPTIONS.map((size) => (
                                    <label key={size}>
                                        <input
                                            type="checkbox"
                                            checked={form.sizes.includes(size)}
                                            onChange={() => handleSizeChange(size)}
                                        />
                                        {size}
                                    </label>
                                ))}
                            </div>
                        </fieldset>

                        <label>
                            Image URL
                            <input
                                name="imageUrl"
                                type="url"
                                value={form.imageUrl}
                                onChange={handleFormChange}
                                placeholder="https://..."
                            />
                        </label>

                        <div className="admin-product-checkboxes">
                            <label>
                                <input
                                    type="checkbox"
                                    name="isFeatured"
                                    checked={form.isFeatured}
                                    onChange={handleFormChange}
                                />
                                Featured Product
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                    name="isNewArrival"
                                    checked={form.isNewArrival}
                                    onChange={handleFormChange}
                                />
                                New Arrival
                            </label>
                        </div>

                        <div className="admin-products-header-actions">
                            <button
                                type="submit"
                                className="admin-products-primary-btn"
                                disabled={saving}
                            >
                                {saving ? "Saving..." : "Save Product"}
                            </button>

                            <button
                                type="button"
                                className="admin-products-secondary-btn"
                                disabled={saving}
                                onClick={() => {
                                    setShowForm(false);
                                    setError("");
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </section>
            )}

            <section className="admin-products-panel">
                <div className="admin-products-panel-heading">
                    <h2>All Products</h2>
                    <span>{products.length} products</span>
                </div>

                {loading ? (
                    <p className="admin-products-message">
                        Loading products...
                    </p>
                ) : products.length === 0 ? (
                    <p className="admin-products-message">
                        No products found. Add your first product.
                    </p>
                ) : (
                    <div className="admin-products-table-wrapper">
                        <table className="admin-products-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Product</th>
                                    <th>Category</th>
                                    <th>Price</th>
                                    <th>Stock</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map((product) => {
                                    const active = isProductActive(product);

                                    return (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>
                                                <strong>{product.name}</strong>
                                                <small>
                                                    {product.subcategory || "—"}
                                                </small>
                                            </td>
                                            <td>{product.category || "—"}</td>
                                            <td>
                                                ₹
                                                {Number(
                                                    product.salePrice ??
                                                        product.price
                                                ).toLocaleString("en-IN")}
                                            </td>
                                            <td>{product.stock ?? 0}</td>
                                            <td>
                                                <span
                                                    className={`admin-products-status ${
                                                        active
                                                            ? "is-active"
                                                            : "is-inactive"
                                                    }`}
                                                >
                                                    {active ? "Active" : "Inactive"}
                                                </span>
                                            </td>
                                            <td>
                                                {active ? (
                                                    <button
                                                        type="button"
                                                        className="admin-products-action-btn"
                                                        onClick={() =>
                                                            handleDeactivate(product)
                                                        }
                                                    >
                                                        Deactivate
                                                    </button>
                                                ) : (
                                                    <span className="admin-products-muted">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </main>
    );
}

export default AdminProducts;
