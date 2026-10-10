import "./Categories.css";
import categories from "./categoryData";

function Categories() {

    return (

        <section className="categories-section">

            <div className="container">

                <div className="section-heading">

                    <h2>Shop By Category</h2>

                    <p>
                        Explore our premium collections crafted for every style.
                    </p>

                </div>

                <div className="category-grid">

                    {categories.map(category => (

                        <div
                            className="category-card"
                            key={category.id}
                        >

                            <img
                                src={category.image}
                                alt={category.title}
                            />

                            <div className="category-overlay">

                                <h3>{category.title}</h3>

                                <p>{category.subtitle}</p>

                                <button>

                                    Shop Collection

                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>

    );

}

export default Categories;