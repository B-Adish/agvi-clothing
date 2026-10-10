import "../../../../styles/components/wishlistitem.css";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useWishlist } from "../../../../context/WishlistContext";
import { useCart } from "../../../../context/CartContext";

function WishlistItem({ item }) {
    const { removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart({
            ...item,
            quantity: 1,
            selectedSize: item.sizes?.[0] || "M",
            selectedColor:
                item.colors?.[0] || {
                    name: "Default",
                    code: "#000000"
                }
        });
    };

    return (
        <div className="wishlist-item">

            <Link to={`/product/${item.slug}`}>
                <img
                    src={item.images?.[0]}
                    alt={item.name}
                    className="wishlist-image"
                />
            </Link>

            <div className="wishlist-details">

                <Link to={`/product/${item.slug}`}>
                    <h3>{item.name}</h3>
                </Link>

                <p>{item.category}</p>

                <h4>₹{item.price}</h4>

            </div>

            <button
                type="button"
                className="wishlist-cart-btn"
                onClick={handleAddToCart}
            >
                <HiOutlineShoppingBag />
            </button>

            <button
                type="button"
                className="wishlist-remove-btn"
                onClick={() =>
                    removeFromWishlist(item.id)
                }
            >
                <FaTrash />
            </button>

        </div>
    );
}

export default WishlistItem;