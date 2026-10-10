import "./ProductInfo.css";
import { useState } from "react";
import { FaStar, FaHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";

import { useCart } from "../../../../context/CartContext";
import { useWishlist } from "../../../../context/WishlistContext";

function ProductInfo({ product }) {

    const [selectedColor, setSelectedColor] =
        useState(product.colors[0]);

    const [selectedSize, setSelectedSize] =
        useState("");

    const [quantity, setQuantity] =
        useState(1);

    const { addToCart } = useCart();

    const {
        wishlistItems,
        toggleWishlist
    } = useWishlist();

    const isWishlisted = wishlistItems.some(
        (item) => item.id === product.id
    );

    const handleAddToCart = () => {

        if (!selectedSize) {
            alert("Please select a size.");
            return;
        }

        addToCart({
            ...product,
            selectedSize,
            selectedColor,
            quantity
        });

        setQuantity(1);

        alert("Product added to cart.");
    };

    const handleWishlist = () => {

        toggleWishlist(product);

    };

    return (
        <div className="product-info">

            <span className="product-badge">
                {product.badge}
            </span>

            <h1>{product.name}</h1>

            <div className="product-rating">

                <div className="stars">

                    {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} />
                    ))}

                </div>

                <span>{product.rating}</span>

                <p>
                    ({product.reviews} Reviews)
                </p>

            </div>

            <div className="product-price">

                <h2>₹{product.price}</h2>

                <span>
                    ₹{product.originalPrice}
                </span>

                <small>
                    {Math.round(
                        (
                            (product.originalPrice -
                                product.price) /
                            product.originalPrice
                        ) * 100
                    )}% OFF
                </small>

            </div>

            <div className="product-option">

                <h4>Color</h4>

                <div className="color-list">

                    {product.colors.map((color) => (

                        <button
                            key={color.name}
                            type="button"
                            className={
                                selectedColor.name === color.name
                                    ? "color-circle active"
                                    : "color-circle"
                            }
                            style={{
                                backgroundColor: color.code
                            }}
                            onClick={() =>
                                setSelectedColor(color)
                            }
                        />

                    ))}

                </div>

                <p className="selected-option">
                    {selectedColor.name}
                </p>

            </div>

            <div className="product-option">

                <div className="size-header">

                    <h4>Size</h4>

                    <button
                        type="button"
                        className="size-guide"
                    >
                        Size Guide
                    </button>

                </div>

                <div className="size-list">

                    {product.sizes.map((size) => (

                        <button
                            key={size}
                            type="button"
                            className={
                                selectedSize === size
                                    ? "size-btn active"
                                    : "size-btn"
                            }
                            onClick={() =>
                                setSelectedSize(size)
                            }
                        >
                            {size}
                        </button>

                    ))}

                </div>

            </div>

            <div className="product-option">

                <h4>Quantity</h4>

                <div className="quantity-box">

                    <button
                        type="button"
                        onClick={() =>
                            quantity > 1 &&
                            setQuantity(quantity - 1)
                        }
                    >
                        −
                    </button>

                    <span>{quantity}</span>

                    <button
                        type="button"
                        onClick={() =>
                            setQuantity(quantity + 1)
                        }
                    >
                        +
                    </button>

                </div>

            </div>

            <div className="action-buttons">

                <button
                    type="button"
                    className="cart-btn"
                    onClick={handleAddToCart}
                >
                    <HiOutlineShoppingBag />
                    Add To Cart
                </button>

                <button
                    type="button"
                    className="buy-btn"
                >
                    Buy Now
                </button>

            </div>

            <button
                type="button"
                className={
                    isWishlisted
                        ? "wishlist-btn-large active"
                        : "wishlist-btn-large"
                }
                onClick={handleWishlist}
            >
                <FaHeart />

                {isWishlisted
                    ? "Remove From Wishlist"
                    : "Add To Wishlist"}
            </button>

            <div className="delivery-card">

                <div>✓ Free Shipping</div>

                <div>✓ Easy Returns</div>

                <div>✓ Secure Checkout</div>

                <div>✓ Premium Packaging</div>

            </div>

        </div>
    );
}

export default ProductInfo;