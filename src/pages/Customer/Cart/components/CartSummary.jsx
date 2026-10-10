import "../../../../styles/components/cartsummary.css";
import { useCart } from "../../../../context/CartContext";
import { useNavigate } from "react-router-dom";

function CartSummary() {

    const { cartItems } = useCart();

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const delivery = subtotal > 0 ? 99 : 0;

    const total = subtotal + delivery;

    const navigate = useNavigate();

    return (
        <div className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
                <span>Delivery</span>
                <span>₹{delivery}</span>
            </div>

            <div className="summary-total">
                <span>Total</span>
                <span>₹{total}</span>
            </div>

            <button
                type="button"
                className="checkout-btn"
                onClick={() => navigate("/checkout")}
            >
                Proceed to Checkout
            </button>

        </div>
    );

}

export default CartSummary;