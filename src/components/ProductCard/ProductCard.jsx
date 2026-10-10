import "./ProductCard.css";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { wishlistItems, toggleWishlist } = useWishlist();

    const isWishlisted = wishlistItems.some(
        (item) => item.id === product.id
    );

    const handleWishlist = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product);
    };

    const handleCart = (e) => {
        e.preventDefault();
        e.stopPropagation();

        addToCart({
            ...product,
            quantity: 1,
            selectedSize: product.sizes?.[0] || "M",
            selectedColor: product.colors?.[0]
        });
    };

    return (
        <div className="product-card">
            <button
                type="button"
                className="wishlist-btn"
                onClick={handleWishlist}
                aria-label={
                    isWishlisted ? "Remove from wishlist" : "Add to wishlist"
                }
            >
                {isWishlisted ? (
                    <FaHeart className="heart-active" />
                ) : (
                    <FaRegHeart />
                )}
            </button>

            <div className="product-image">
                <Link
                    to={`/product/${product.slug}`}
                    className="product-card-link"
                >
                    <img src={product.images[0]} alt={product.name} />
                </Link>
            </div>

            <div className="product-info">
                <Link
                    to={`/product/${product.slug}`}
                    className="product-title"
                >
                    <h3>{product.name}</h3>
                </Link>

                <div className="product-price">
                    ₹{product.price}
                </div>

                <button
                    type="button"
                    className="cart-btn"
                    onClick={handleCart}
                    disabled={product.stock === 0}
                >
                    <HiOutlineShoppingBag />
                    <span>
                        {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                    </span>
                </button>
            </div>
        </div>
    );
}

export default ProductCard;
