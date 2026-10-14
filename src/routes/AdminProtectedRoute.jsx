
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function AdminProtectedRoute({ children }) {
    const [status, setStatus] = useState("checking");

    useEffect(() => {
        const verifyAdmin = async () => {
            const token = sessionStorage.getItem("adminToken");

            if (!token) {
                setStatus("unauthorized");
                return;
            }

            try {
                const response = await fetch(
                    "http://localhost:5000/api/admin/verify",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = await response.json();

                if (response.ok && data.success) {
                    setStatus("authorized");
                } else {
                    sessionStorage.removeItem("adminToken");
                    setStatus("unauthorized");
                }
            } catch (error) {
                setStatus("error");
            }
        };

        verifyAdmin();
    }, []);

    if (status === "checking") {
        return <p style={{ textAlign: "center", marginTop: "80px" }}>Verifying admin access...</p>;
    }

    if (status === "unauthorized") {
        return <Navigate to="/admin/login" replace />;
    }

    if (status === "error") {
        return <p>Unable to verify admin access. Please check that the backend server is running and refresh.</p>;
    }

    return children;
}

export default AdminProtectedRoute;
