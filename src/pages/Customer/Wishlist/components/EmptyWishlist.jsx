import { Link } from "react-router-dom";
import "../../../../styles/components/emptywishlist.css";

function EmptyWishlist() {

    return (

        <div className="empty-wishlist">

            <h2>Your Wishlist is Empty</h2>

            <p>
                Save your favourite products here.
            </p>

            <Link
                to="/catalog"
                className="wishlist-shop-btn"
            >

                Continue Shopping

            </Link>

        </div>

    );

}

export default EmptyWishlist;