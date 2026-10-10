import "../../../../styles/components/cartitem.css";
import { FaTrash } from "react-icons/fa";
import { useCart } from "../../../../context/CartContext";

function CartItem({ item }) {
    const {
        increaseQuantity,
        decreaseQuantity,
        removeFromCart
    } = useCart();

    const colorName = item.selectedColor?.name || "Default";

    return (
        <div className="cart-item">

            <img
                src={item.images?.[0]}
                alt={item.name}
                className="cart-image"
            />

            <div className="cart-details">

                <h3>{item.name}</h3>

                <p>
                    Size: <span>{item.selectedSize}</span>
                </p>

                <p>
                    Color: <span>{colorName}</span>
                </p>

                <h4>₹{item.price}</h4>

            </div>

            <div className="cart-quantity">

                <button
                    type="button"
                    onClick={() =>
                        decreaseQuantity(
                            item.id,
                            item.selectedSize,
                            colorName
                        )
                    }
                >
                    -
                </button>

                <span>{item.quantity}</span>

                <button
                    type="button"
                    onClick={() =>
                        increaseQuantity(
                            item.id,
                            item.selectedSize,
                            colorName
                        )
                    }
                >
                    +
                </button>

            </div>

            <button
                type="button"
                className="remove-btn"
                onClick={() =>
                    removeFromCart(
                        item.id,
                        item.selectedSize,
                        colorName
                    )
                }
            >
                <FaTrash />
            </button>

        </div>
    );
}

export default CartItem;