import { useState } from "react";
import "./ProductTabs.css";

function ProductTabs() {
    const [activeTab, setActiveTab] = useState("description");

    return (
        <section className="product-tabs">
            <div className="tabs-header">

                <button
                    className={activeTab === "description" ? "active" : ""}
                    onClick={() => setActiveTab("description")}
                >
                    Description
                </button>

                <button
                    className={activeTab === "material" ? "active" : ""}
                    onClick={() => setActiveTab("material")}
                >
                    Material
                </button>

                <button
                    className={activeTab === "wash" ? "active" : ""}
                    onClick={() => setActiveTab("wash")}
                >
                    Wash Care
                </button>

                <button
                    className={activeTab === "shipping" ? "active" : ""}
                    onClick={() => setActiveTab("shipping")}
                >
                    Shipping
                </button>

                <button
                    className={activeTab === "reviews" ? "active" : ""}
                    onClick={() => setActiveTab("reviews")}
                >
                    Reviews
                </button>

            </div>

            <div className="tabs-content">

                {activeTab === "description" && (
                    <div className="tab-panel">
                        <h3>Product Description</h3>

                        <p>
                            Elevate your everyday wardrobe with our Premium Lavender Cotton Kurti.
                            Designed with premium breathable cotton fabric, this kurti offers
                            exceptional comfort while maintaining a graceful silhouette. Perfect
                            for office wear, casual outings and festive occasions.
                        </p>

                        <ul>
                            <li>Premium breathable cotton fabric</li>
                            <li>Soft finish for maximum comfort</li>
                            <li>Elegant regular fit</li>
                            <li>Suitable for everyday wear</li>
                        </ul>
                    </div>
                )}

                {activeTab === "material" && (
                    <div className="tab-panel">
                        <h3>Material Details</h3>

                        <ul>
                            <li>100% Premium Cotton</li>
                            <li>Soft Touch Finish</li>
                            <li>Skin Friendly Fabric</li>
                            <li>Lightweight & Breathable</li>
                        </ul>
                    </div>
                )}

                {activeTab === "wash" && (
                    <div className="tab-panel">
                        <h3>Wash Care</h3>

                        <ul>
                            <li>Machine Wash Cold</li>
                            <li>Wash With Similar Colours</li>
                            <li>Do Not Bleach</li>
                            <li>Iron At Low Temperature</li>
                            <li>Dry In Shade</li>
                        </ul>
                    </div>
                )}

                {activeTab === "shipping" && (
                    <div className="tab-panel">
                        <h3>Shipping Information</h3>

                        <ul>
                            <li>Free Shipping Across India</li>
                            <li>Dispatch Within 24 Hours</li>
                            <li>Delivery In 3–7 Business Days</li>
                            <li>7 Days Easy Return</li>
                        </ul>
                    </div>
                )}

                {activeTab === "reviews" && (
                    <div className="tab-panel">

                        <div className="review-card">
                            <h4>★★★★★</h4>
                            <strong>Priya S.</strong>

                            <p>
                                Excellent quality and premium stitching. The fabric feels
                                really soft and comfortable.
                            </p>
                        </div>

                        <div className="review-card">
                            <h4>★★★★★</h4>
                            <strong>Ananya R.</strong>

                            <p>
                                Beautiful colour exactly as shown in the pictures.
                                Worth every rupee.
                            </p>
                        </div>

                    </div>
                )}

            </div>
        </section>
    );
}

export default ProductTabs;