import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "../pages/Customer/Home/Home";
import Catalog from "../pages/Customer/Catalog/Catalog";
import ProductDetails from "../pages/Customer/ProductDetails/ProductDetails";
import Cart from "../pages/Customer/Cart/Cart";
import Wishlist from "../pages/Customer/Wishlist/Wishlist";
import Login from "../pages/Customer/Auth/Login";
import Register from "../pages/Customer/Auth/Register";
import ForgotPassword from "../pages/Customer/Auth/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import Profile from "../pages/Customer/Profile/Profile";
import Checkout from "../pages/Customer/Checkout/Checkout";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalog" element={<Catalog/>}/>
                    <Route path="/product/:slug" element={<ProductDetails />}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/wishlist" element={<Wishlist/>}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/register" element={<Register />}/>
                    <Route path="/forgot-password" element={<ForgotPassword />}/>
                    <Route path="/profile" element={
                            <ProtectedRoute>

                                <Profile/>

                            </ProtectedRoute>
                        }
                    />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;