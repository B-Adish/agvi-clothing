import "../../../styles/pages/cart.css";
import { useCart, getCartKey } from "../../../context/CartContext";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";
import EmptyCart from "./components/EmptyCart";

function Cart() {
    const { cartItems } = useCart();

    return (
        <section className="cart-page">
            <div className="container">
                <h1 className="cart-title">
                    Shopping Cart
                </h1>

                {cartItems.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="cart-layout">
                        <div className="cart-items">
                            {cartItems.map((item) => (
                                <CartItem
                                    key={getCartKey(item)}
                                    item={item}
                                />
                            ))}
                        </div>

                        <CartSummary />
                    </div>
                )}
            </div>
        </section>
    );
}

export default Cart;