import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./styles/themes/variables.css";
import "./styles/base/reset.css";
import "./styles/base/global.css";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import { SearchProvider } from "./context/SearchContext";
import { RecentlyViewedProvider } from "./context/RecentlyViewedContext";
import { AuthProvider } from "./context/AuthContext";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AuthProvider>
            <RecentlyViewedProvider>
                    <SearchProvider>
                        <WishlistProvider>
                            <CartProvider>
                                <App/>
                            </CartProvider>
                        </WishlistProvider>
                    </SearchProvider>
            </RecentlyViewedProvider>
        </AuthProvider>
    </StrictMode>
);