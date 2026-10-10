import { Link } from "react-router-dom";
import "../../../../styles/components/emptycart.css";

function EmptyCart() {
    return (
        <div className="empty-cart">

            <img
                src="/images/empty-cart.png"
                alt="Empty Cart"
            />

            <h2>Your Cart is Empty</h2>

            <p>
                Looks like you haven't added anything yet.
            </p>

            <Link
                to="/catalog"
                className="shop-btn"
            >
                Continue Shopping
            </Link>

        </div>
    );
}

export default EmptyCart;