import "./RelatedProducts.css";
import ProductCard from "../../../../components/ProductCard/ProductCard";
import products from "../../../../data/productData";

function RelatedProducts({ product }) {

    const relatedProducts = products
        .filter(
            item =>
                item.category === product.category &&
                item.id !== product.id
        )
        .slice(0,4);

    return (

        <section className="related-products">

            <div className="section-heading">

                <h2>

                    You May Also Like

                </h2>

                <p>

                    Complete your look with our best selling collections.

                </p>

            </div>

            <div className="related-grid">

                {relatedProducts.map((item)=>(

                    <ProductCard
                        key={item.id}
                        product={item}
                    />

                ))}

            </div>

        </section>

    );

}

export default RelatedProducts;