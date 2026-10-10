import "./RecentlyViewed.css";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import { useRecentlyViewed } from "../../../../context/RecentlyViewedContext";

function RecentlyViewed() {

    const { recentProducts } = useRecentlyViewed();

    if (recentProducts.length <= 1) return null;

    return (

        <section className="recently-viewed">

            <div className="section-heading">

                <h2>

                    Recently Viewed

                </h2>

                <p>

                    Continue where you left off.

                </p>

            </div>

            <div className="related-grid">

                {recentProducts.slice(1).map((product)=>(

                    <ProductCard
                        key={product.id}
                        product={product}
                    />

                ))}

            </div>

        </section>

    );

}

export default RecentlyViewed;