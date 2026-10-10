import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

const getColor = (product) => {
    if (product.selectedColor?.name) {
        return product.selectedColor;
    }

    if (product.colors?.[0]) {
        return product.colors[0];
    }

    return {
        name: "Default",
        code: "#000000"
    };
};

const getCartKey = (item) => {
    return `${item.id}-${item.selectedSize}-${item.selectedColor?.name || "Default"}`;
};

export function CartProvider({ children }) {

    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem("agvi-cart");

            if (!savedCart) {
                return [];
            }

            const items = JSON.parse(savedCart);

            if (!Array.isArray(items)) {
                return [];
            }

            return items.map((item) => ({
                ...item,
                quantity: item.quantity || 1,
                selectedSize:
                    item.selectedSize ||
                    item.sizes?.[0] ||
                    "M",
                selectedColor: getColor(item)
            }));

        } catch (error) {
            console.error("Cart loading error:", error);
            return [];
        }
    });

    const addToCart = (product) => {

        const item = {
            ...product,
            quantity: product.quantity || 1,
            selectedSize:
                product.selectedSize ||
                product.sizes?.[0] ||
                "M",
            selectedColor: getColor(product)
        };

        setCartItems((currentItems) => {

            const existingItem = currentItems.find(
                (cartItem) =>
                    cartItem.id === item.id &&
                    cartItem.selectedSize === item.selectedSize &&
                    cartItem.selectedColor?.name ===
                        item.selectedColor?.name
            );

            if (existingItem) {

                return currentItems.map((cartItem) =>
                    cartItem.id === item.id &&
                    cartItem.selectedSize === item.selectedSize &&
                    cartItem.selectedColor?.name ===
                        item.selectedColor?.name
                        ? {
                              ...cartItem,
                              quantity:
                                  cartItem.quantity +
                                  item.quantity
                          }
                        : cartItem
                );
            }

            return [...currentItems, item];
        });
    };

    const removeFromCart = (
        id,
        selectedSize,
        selectedColor
    ) => {

        setCartItems((currentItems) =>
            currentItems.filter(
                (item) =>
                    getCartKey(item) !==
                    `${id}-${selectedSize}-${selectedColor}`
            )
        );
    };

    const increaseQuantity = (
        id,
        selectedSize,
        selectedColor
    ) => {

        setCartItems((currentItems) =>
            currentItems.map((item) =>
                getCartKey(item) ===
                `${id}-${selectedSize}-${selectedColor}`
                    ? {
                          ...item,
                          quantity: item.quantity + 1
                      }
                    : item
            )
        );
    };

    const decreaseQuantity = (
        id,
        selectedSize,
        selectedColor
    ) => {

        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    getCartKey(item) ===
                    `${id}-${selectedSize}-${selectedColor}`
                        ? {
                              ...item,
                              quantity: item.quantity - 1
                          }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    useEffect(() => {
        localStorage.setItem(
            "agvi-cart",
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}

export { getCartKey };