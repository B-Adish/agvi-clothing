import "./NewArrivals.css";
import ProductCard from "../ProductCard/ProductCard";
import products from "../../data/productData";

function NewArrivals() {

    const newArrivals = products.slice(0, 4);

    return (
        <section className="new-arrivals">

            <div className="container">

                <div className="section-heading">

                    <h2>New Arrivals</h2>

                    <p>
                        Discover the newest styles carefully selected for you.
                    </p>

                </div>

                <div className="product-grid">

                    {newArrivals.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}

                </div>

            </div>

        </section>
    );
}

export default NewArrivals;