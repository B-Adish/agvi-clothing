import "./Checkout.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

function Checkout() {
    const navigate = useNavigate();
    const { cartItems } = useCart();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    const [paymentMethod, setPaymentMethod] = useState("cod");

    const subtotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const delivery = subtotal >= 2000 ? 0 : 99;
    const total = subtotal + delivery;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            navigate("/catalog");
            return;
        }

        console.log("Checkout Data:", {
            customer: formData,
            paymentMethod,
            items: cartItems,
            total
        });

        alert("Order placed successfully!");

        navigate("/");
    };

    if (cartItems.length === 0) {
        return (
            <section className="checkout-page">
                <div className="container checkout-empty">
                    <h1>Your Cart is Empty</h1>
                    <p>Add products to your cart before checkout.</p>

                    <button
                        type="button"
                        onClick={() => navigate("/catalog")}
                    >
                        Continue Shopping
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section className="checkout-page">
            <div className="container">

                <div className="checkout-header">
                    <h1>Checkout</h1>
                    <p>Complete your order securely</p>
                </div>

                <form
                    className="checkout-layout"
                    onSubmit={handleSubmit}
                >

                    <div className="checkout-left">

                        <div className="checkout-card">

                            <h2>Delivery Information</h2>

                            <div className="checkout-grid">

                                <div className="checkout-field">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>

                                <div className="checkout-field">
                                    <label>Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                        required
                                    />
                                </div>

                                <div className="checkout-field full-width">
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        required
                                    />
                                </div>

                                <div className="checkout-field full-width">
                                    <label>Address</label>
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="House / Street / Area"
                                        rows="4"
                                        required
                                    />
                                </div>

                                <div className="checkout-field">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="City"
                                        required
                                    />
                                </div>

                                <div className="checkout-field">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        placeholder="State"
                                        required
                                    />
                                </div>

                                <div className="checkout-field">
                                    <label>Pincode</label>
                                    <input
                                        type="text"
                                        name="pincode"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                        placeholder="Pincode"
                                        required
                                    />
                                </div>

                            </div>

                        </div>

                        <div className="checkout-card">

                            <h2>Payment Method</h2>

                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="cod"
                                    checked={paymentMethod === "cod"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />

                                <div>
                                    <strong>Cash on Delivery</strong>
                                    <p>Pay when your order arrives.</p>
                                </div>
                            </label>

                            <label className="payment-option">
                                <input
                                    type="radio"
                                    name="payment"
                                    value="online"
                                    checked={paymentMethod === "online"}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                />

                                <div>
                                    <strong>Online Payment</strong>
                                    <p>Payment gateway will be connected later.</p>
                                </div>
                            </label>

                        </div>

                    </div>

                    <aside className="checkout-summary">

                        <h2>Order Summary</h2>

                        <div className="checkout-products">

                            {cartItems.map((item) => (
                                <div
                                    className="checkout-product"
                                    key={`${item.id}-${item.selectedSize}-${item.selectedColor?.name}`}
                                >

                                    <img
                                        src={item.images?.[0]}
                                        alt={item.name}
                                    />

                                    <div>
                                        <h3>{item.name}</h3>

                                        <p>
                                            Size: {item.selectedSize}
                                        </p>

                                        <p>
                                            Qty: {item.quantity}
                                        </p>
                                    </div>

                                    <strong>
                                        ₹{item.price * item.quantity}
                                    </strong>

                                </div>
                            ))}

                        </div>

                        <div className="summary-line">
                            <span>Subtotal</span>
                            <span>₹{subtotal}</span>
                        </div>

                        <div className="summary-line">
                            <span>Delivery</span>
                            <span>
                                {delivery === 0
                                    ? "FREE"
                                    : `₹${delivery}`}
                            </span>
                        </div>

                        <hr />

                        <div className="summary-total">
                            <span>Total</span>
                            <strong>₹{total}</strong>
                        </div>

                        <button
                            type="submit"
                            className="place-order-btn"
                        >
                            Place Order
                        </button>

                    </aside>

                </form>

            </div>
        </section>
    );
}

export default Checkout;