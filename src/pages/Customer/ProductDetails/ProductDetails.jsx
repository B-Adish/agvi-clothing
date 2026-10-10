import "./ProductDetails.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import products from "../../../data/productData";

import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import ProductTabs from "./components/ProductTabs";
import RelatedProducts from "./components/RelatedProducts";
import RecentlyViewed from "./components/RecentlyViewed";

import { useRecentlyViewed } from "../../../context/RecentlyViewedContext";

function ProductDetails() {

    const { slug } = useParams();

    const product = products.find(
        (item) => item.slug === slug
    );

    const { addRecentProduct } =
        useRecentlyViewed();

    useEffect(() => {

        if (product) {
            addRecentProduct(product);
        }

    }, [product, addRecentProduct]);

    if (!product) {
        return (
            <section className="product-details">
                <div className="container">
                    <h2>Product Not Found</h2>
                </div>
            </section>
        );
    }

    return (
        <section className="product-details">

            <div className="container">

                <div className="product-wrapper">

                    <ProductGallery
                        product={product}
                    />

                    <ProductInfo
                        product={product}
                    />

                </div>

                <ProductTabs
                    product={product}
                />

                <RelatedProducts
                    product={product}
                />

                <RecentlyViewed />

            </div>

        </section>
    );
}

export default ProductDetails;