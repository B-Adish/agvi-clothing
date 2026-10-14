import "./AdminLogin.css";
import { useState } from "react";

function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5000/api/admin/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Login failed.");
            }

            if (!data.token) {
                throw new Error("The server did not return an authentication token.");
            }

            sessionStorage.setItem("adminToken", data.token);
            window.location.href = "/admin/dashboard";
        } catch (err) {
            setError(err.message || "Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="admin-login">
            <form onSubmit={handleSubmit}>
                <h1>AGVI Clothing</h1>
                <h2>Admin Login</h2>
                <p>Sign in to manage your store.</p>

                {error && <p role="alert">{error}</p>}

                <label htmlFor="admin-username">Username</label>
                <input
                    id="admin-username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    required
                />

                <label htmlFor="admin-password">Password</label>
                <input
                    id="admin-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Signing in..." : "Sign In"}
                </button>
            </form>
        </main>
    );
}

export default AdminLogin;
