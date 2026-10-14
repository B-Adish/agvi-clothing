
import "./Categories.css";
import categories from "./categoryData";

function Categories() {
    const womenCategory = categories.find(
        (category) => category.title.toLowerCase() === "women"
    );

    const visibleCategories = [
        womenCategory && {
            ...womenCategory,
            id: "women",
            title: "Women",
            subtitle: "Explore our women's collection",
        },
        womenCategory && {
            ...womenCategory,
            id: "made-to-order",
            title: "Made to Order",
            subtitle: "Discover styles made to order",
        },
        womenCategory && {
            ...womenCategory,
            id: "immediate-dispatch",
            title: "Immediate Dispatch",
            subtitle: "Shop ready-to-dispatch styles",
        },
    ].filter(Boolean);

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
                    {visibleCategories.map((category) => (
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

                                <button
                                    type="button"
                                    onClick={() => {
                                        window.location.href =
                                            `/catalog?category=${encodeURIComponent(category.title)}`;
                                    }}
                                >
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
