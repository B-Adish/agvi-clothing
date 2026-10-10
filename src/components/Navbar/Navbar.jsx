import "../../styles/components/navbar.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FaHeart, FaRegHeart, FaRegUser } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { useSearch } from "../../context/SearchContext";

function Navbar() {
    const [searchOpen, setSearchOpen] = useState(false);

    const navigate = useNavigate();

    const { cartItems } = useCart();
    const { wishlistItems } = useWishlist();
    const { searchQuery, setSearchQuery } = useSearch();

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const wishlistCount = wishlistItems.length;

    const handleSearch = (e) => {
        e.preventDefault();

        const query = searchQuery.trim();

        if (!query) {
            navigate("/catalog");
            return;
        }

        navigate("/catalog");
    };

    return (
        <header className="navbar">
            <div className="container navbar-row">

                <div className="navbar-left">

                    <form
                        className={`search-box ${
                            searchOpen ? "active" : ""
                        }`}
                        onSubmit={handleSearch}
                    >

                        <button
                            type="submit"
                            className="search-button"
                            onClick={() => setSearchOpen(true)}
                        >
                            <IoSearchOutline />
                        </button>

                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) =>
                                setSearchQuery(e.target.value)
                            }
                            onFocus={() => setSearchOpen(true)}
                        />

                    </form>

                </div>

                <div className="navbar-center">

                    <Link
                        to="/"
                        className="brand"
                    >

                        <div className="brand-logo">
                            <span>AG</span>
                        </div>

                        <div className="brand-text">
                            <h1>AGVI</h1>
                            <p>CLOTHING</p>
                        </div>

                    </Link>

                </div>

                <div className="navbar-right">

                    <Link
                        to="/wishlist"
                        className="icon-button cart-icon"
                    >

                        {wishlistCount > 0 ? (
                            <FaHeart className="heart-active" />
                        ) : (
                            <FaRegHeart />
                        )}

                        {wishlistCount > 0 && (
                            <span className="cart-count">
                                {wishlistCount}
                            </span>
                        )}

                    </Link>

                    <Link
                        to="/profile"
                        className="icon-button"
                    >
                        <FaRegUser />
                    </Link>

                    <Link
                        to="/cart"
                        className="icon-button cart-icon"
                    >

                        <HiOutlineShoppingBag />

                        {cartCount > 0 && (
                            <span className="cart-count">
                                {cartCount}
                            </span>
                        )}

                    </Link>

                </div>

            </div>
        </header>
    );
}

export default Navbar;