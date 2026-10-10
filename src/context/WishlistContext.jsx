import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {

    const [wishlistItems, setWishlistItems] = useState(() => {
        try {
            const savedWishlist =
                localStorage.getItem("agvi-wishlist");

            if (!savedWishlist) {
                return [];
            }

            const items = JSON.parse(savedWishlist);

            return Array.isArray(items) ? items : [];

        } catch (error) {
            console.error(
                "Wishlist loading error:",
                error
            );

            return [];
        }
    });

    const toggleWishlist = (product) => {

        setWishlistItems((currentItems) => {

            const exists = currentItems.some(
                (item) => item.id === product.id
            );

            if (exists) {
                return currentItems.filter(
                    (item) => item.id !== product.id
                );
            }

            return [
                ...currentItems,
                product
            ];
        });
    };

    const addToWishlist = (product) => {

        setWishlistItems((currentItems) => {

            const exists = currentItems.some(
                (item) => item.id === product.id
            );

            if (exists) {
                return currentItems;
            }

            return [
                ...currentItems,
                product
            ];
        });
    };

    const removeFromWishlist = (id) => {

        setWishlistItems((currentItems) =>
            currentItems.filter(
                (item) => item.id !== id
            )
        );
    };

    useEffect(() => {

        localStorage.setItem(
            "agvi-wishlist",
            JSON.stringify(wishlistItems)
        );

    }, [wishlistItems]);

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                toggleWishlist,
                addToWishlist,
                removeFromWishlist
            }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    return useContext(WishlistContext);
}