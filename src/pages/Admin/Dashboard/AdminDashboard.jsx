
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            const token = sessionStorage.getItem("adminToken");

            if (!token) {
                navigate("/admin/login", { replace: true });
                return;
            }

            try {
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
                    throw new Error(
                        data.message || "Could not load products."
                    );
                }

                setProducts(data.products || []);
            } catch (err) {
                setError(err.message || "Unable to connect to the server.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [navigate]);

    const activeProducts = products.filter(
        (product) => product.isActive === true || Number(product.isActive) === 1
    );

    const inactiveProducts = products.filter(
        (product) => product.isActive === false || Number(product.isActive) === 0
    );

    const lowStockProducts = activeProducts.filter(
        (product) => Number(product.stock) <= 5
    );

    const statistics = [
        { title: "Total Products", value: products.length },
        { title: "Active Products", value: activeProducts.length },
        { title: "Inactive Products", value: inactiveProducts.length },
        { title: "Low Stock Products", value: lowStockProducts.length },
    ];

    return (
        <main style={styles.page}>
            <header style={styles.header}>
                <div>
                    <p style={styles.eyebrow}>AGVI CLOTHING</p>
                    <h1 style={styles.heading}>Admin Dashboard</h1>
                    <p style={styles.subtitle}>
                        Manage your store and product inventory.
                    </p>
                </div>

                <button
                    style={styles.logoutButton}
                    onClick={() => {
                        sessionStorage.removeItem("adminToken");
                        navigate("/admin/login", { replace: true });
                    }}
                >
                    Sign Out
                </button>
            </header>

            {loading ? (
                <p>Loading dashboard...</p>
            ) : error ? (
                <p role="alert" style={styles.error}>{error}</p>
            ) : (
                <>
                    <section style={styles.grid}>
                        {statistics.map((item) => (
                            <article key={item.title} style={styles.card}>
                                <p style={styles.cardTitle}>{item.title}</p>
                                <h2 style={styles.cardValue}>{item.value}</h2>
                            </article>
                        ))}
                    </section>

                    <section style={styles.panel}>
                        <h2 style={styles.sectionHeading}>Recent Products</h2>

                        {products.length === 0 ? (
                            <p>No products found.</p>
                        ) : (
                            <div style={styles.tableWrapper}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={styles.cell}>Product</th>
                                            <th style={styles.cell}>Category</th>
                                            <th style={styles.cell}>Price</th>
                                            <th style={styles.cell}>Stock</th>
                                            <th style={styles.cell}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.slice(0, 5).map((product) => {
                                            const isActive =
                                                product.isActive === true ||
                                                Number(product.isActive) === 1;

                                            return (
                                                <tr key={product.id}>
                                                    <td style={styles.cell}>
                                                        {product.name}
                                                    </td>
                                                    <td style={styles.cell}>
                                                        {product.category}
                                                    </td>
                                                    <td style={styles.cell}>
                                                        ₹{Number(product.salePrice ?? product.price).toLocaleString("en-IN")}
                                                    </td>
                                                    <td style={styles.cell}>
                                                        {product.stock}
                                                    </td>
                                                    <td style={styles.cell}>
                                                        <span style={{
                                                            ...styles.status,
                                                            background: isActive ? "#e7f5eb" : "#fbe8e8",
                                                            color: isActive ? "#26733b" : "#a12626",
                                                        }}>
                                                            {isActive ? "Active" : "Inactive"}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </>
            )}
        </main>
    );
}

const styles = {
    page: {
        minHeight: "100vh",
        padding: "40px",
        background: "#f8f3f5",
        fontFamily: "Poppins, sans-serif",
        color: "#40152f",
    },
    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
        marginBottom: "32px",
    },
    eyebrow: {
        color: "#72264c",
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "2px",
    },
    heading: {
        margin: "8px 0",
        fontSize: "30px",
    },
    subtitle: {
        color: "#777078",
        fontSize: "14px",
    },
    logoutButton: {
        padding: "11px 20px",
        background: "#72264c",
        color: "#fff",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
        gap: "20px",
        marginBottom: "30px",
    },
    card: {
        padding: "24px",
        background: "#fff",
        border: "1px solid #eadce3",
        borderRadius: "10px",
    },
    cardTitle: {
        margin: 0,
        color: "#777078",
        fontSize: "13px",
    },
    cardValue: {
        margin: "12px 0 0",
        fontSize: "32px",
        color: "#72264c",
    },
    panel: {
        padding: "24px",
        background: "#fff",
        border: "1px solid #eadce3",
        borderRadius: "10px",
    },
    sectionHeading: {
        marginTop: 0,
        fontSize: "20px",
    },
    tableWrapper: {
        overflowX: "auto",
    },
    table: {
        width: "100%",
        borderCollapse: "collapse",
        textAlign: "left",
        fontSize: "13px",
    },
    cell: {
        padding: "14px 12px",
        borderBottom: "1px solid #eee5ea",
        whiteSpace: "nowrap",
    },
    status: {
        display: "inline-block",
        padding: "5px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: 500,
    },
    error: {
        color: "#a12626",
    },
};

export default AdminDashboard;
