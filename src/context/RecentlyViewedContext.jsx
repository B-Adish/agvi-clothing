import { createContext, useContext, useState } from "react";

const RecentlyViewedContext = createContext();

export function RecentlyViewedProvider({ children }) {

    const [recentProducts, setRecentProducts] = useState([]);

    const addRecentProduct = (product) => {

        setRecentProducts(prev => {

            const filtered = prev.filter(
                item => item.id !== product.id
            );

            return [
                product,
                ...filtered
            ].slice(0,4);

        });

    };

    return (

        <RecentlyViewedContext.Provider
            value={{
                recentProducts,
                addRecentProduct
            }}
        >

            {children}

        </RecentlyViewedContext.Provider>

    );

}

export function useRecentlyViewed() {

    return useContext(RecentlyViewedContext);

}