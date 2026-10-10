import "../../../styles/pages/wishlist.css";
import { useWishlist } from "../../../context/WishlistContext";
import WishlistItem from "./components/WishlistItem";
import EmptyWishlist from "./components/EmptyWishlist";

function Wishlist() {
    const { wishlistItems } = useWishlist();

    return (
        <section className="wishlist-page">
            <div className="container">
                <h1 className="wishlist-title">
                    Wishlist
                </h1>

                {wishlistItems.length === 0 ? (
                    <EmptyWishlist />
                ) : (
                    <div className="wishlist-list">
                        {wishlistItems.map((item) => (
                            <WishlistItem
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Wishlist;