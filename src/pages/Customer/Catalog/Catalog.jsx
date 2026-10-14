
import "./Catalog.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../../../components/ProductCard/ProductCard";
import products from "../../../data/productData";
import { useSearch } from "../../../context/SearchContext";

const categories = [
    "All",
    "Women",
    "Made to Order",
    "Immediate Dispatch",
];

const subcategories = [
    "All",
    "Kurti",
    "Maxi",
    "Short Tops",
    "Co-ord Set",
    "Ethnic Wear",
];

function Catalog() {
    const { searchQuery } = useSearch();
    const [searchParams, setSearchParams] = useSearchParams();

    const [selectedCategory, setSelectedCategory] = useState(
        searchParams.get("category") || "All"
    );
    const [selectedSubCategory, setSelectedSubCategory] = useState("All");

    const [minPriceInput, setMinPriceInput] = useState("0");
    const [maxPriceInput, setMaxPriceInput] = useState("5000");
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);
    const [sortBy, setSortBy] = useState("Newest");

    useEffect(() => {
        const categoryFromUrl = searchParams.get("category");

        if (categories.includes(categoryFromUrl)) {
            setSelectedCategory(categoryFromUrl);
            setSelectedSubCategory("All");
        }
    }, [searchParams]);

    const chooseCategory = (category) => {
        setSelectedCategory(category);
        setSelectedSubCategory("All");

        if (category === "All") {
            setSearchParams({});
        } else {
            setSearchParams({ category });
        }
    };

    const applyFilters = () => {
        const from = minPriceInput === "" ? 0 : Number(minPriceInput);
        const to = maxPriceInput === "" ? 5000 : Number(maxPriceInput);

        if (
            !Number.isFinite(from) ||
            !Number.isFinite(to) ||
            from < 0 ||
            to < 0 ||
            from > to
        ) {
            alert("Please enter a valid price range.");
            return;
        }

        setMinPrice(from);
        setMaxPrice(to);
    };

    const resetFilters = () => {
        chooseCategory("All");
        setSelectedSubCategory("All");
        setMinPriceInput("0");
        setMaxPriceInput("5000");
        setMinPrice(0);
        setMaxPrice(5000);
        setSortBy("Newest");
    };

    const customerProducts = products.filter(
        (product) => product.category === "Women"
    );

    const filteredProducts = customerProducts.filter((product) => {
        const search = searchQuery.toLowerCase().trim();

        const matchesSearch =
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search) ||
            product.subcategory.toLowerCase().includes(search);

        // For now, the same women's products appear in all three categories.
        const matchesCategory =
            selectedCategory === "All" ||
            ["Women", "Made to Order", "Immediate Dispatch"].includes(
                selectedCategory
            );

        const matchesSubCategory =
            selectedSubCategory === "All" ||
            product.subcategory === selectedSubCategory;

        const matchesPrice =
            product.price >= minPrice &&
            product.price <= maxPrice;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesSubCategory &&
            matchesPrice
        );
    });

    const sortedProducts = [...filteredProducts];

    if (sortBy === "LowToHigh") {
        sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "HighToLow") {
        sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "Popularity") {
        sortedProducts.sort(
            (a, b) => (b.rating || 0) - (a.rating || 0)
        );
    } else if (sortBy === "Availability") {
        sortedProducts.sort(
            (a, b) => Number(b.stock > 0) - Number(a.stock > 0)
        );
    }

    return (
        <section className="catalog">
            <div className="container">
                <div className="catalog-header">
                    <h1>Catalog</h1>
                    <p>Discover our premium women's fashion collections.</p>
                </div>

                <div className="catalog-layout">
                    <aside className="catalog-sidebar">
                        <h3>Categories</h3>

                        <ul className="category-list">
                            {categories.map((category) => (
                                <li
                                    key={category}
                                    className={
                                        selectedCategory === category
                                            ? "active-category"
                                            : ""
                                    }
                                    onClick={() => chooseCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <hr />

                        <h3>Sub Categories</h3>

                        <ul className="category-list">
                            {subcategories.map((subcategory) => (
                                <li
                                    key={subcategory}
                                    className={
                                        selectedSubCategory === subcategory
                                            ? "active-category"
                                            : ""
                                    }
                                    onClick={() =>
                                        setSelectedSubCategory(subcategory)
                                    }
                                >
                                    {subcategory}
                                </li>
                            ))}
                        </ul>

                        <hr />

                        <h3>Price</h3>

                        <div className="price-inputs">
                            <div className="price-field">
                                <label htmlFor="min-price">From</label>
                                <div className="price-input-wrapper">
                                    <span>₹</span>
                                    <input
                                        id="min-price"
                                        type="number"
                                        min="0"
                                        value={minPriceInput}
                                        onChange={(e) =>
                                            setMinPriceInput(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="price-field">
                                <label htmlFor="max-price">To</label>
                                <div className="price-input-wrapper">
                                    <span>₹</span>
                                    <input
                                        id="max-price"
                                        type="number"
                                        min="0"
                                        value={maxPriceInput}
                                        onChange={(e) =>
                                            setMaxPriceInput(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="filter-buttons">
                            <button
                                type="button"
                                className="apply-filters"
                                onClick={applyFilters}
                            >
                                Apply Filters
                            </button>

                            <button
                                type="button"
                                className="reset-filters"
                                onClick={resetFilters}
                            >
                                Reset Filters
                            </button>
                        </div>

                        <p className="price-range">
                            ₹{minPrice} - ₹{maxPrice}
                        </p>

                        <hr />

                        <h3>Sort By</h3>

                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="Newest">Newest</option>
                            <option value="Availability">Availability</option>
                            <option value="LowToHigh">Price: Low to High</option>
                            <option value="HighToLow">Price: High to Low</option>
                            <option value="Popularity">Popularity</option>
                        </select>
                    </aside>

                    <div className="catalog-content">
                        <div className="catalog-topbar">
                            <p>
                                Showing <strong>{sortedProducts.length}</strong>{" "}
                                Products
                            </p>
                        </div>

                        <div className="catalog-products">
                            {sortedProducts.length === 0 ? (
                                <div className="no-products">
                                    <h2>No Products Found</h2>
                                    <p>Try another search or filter.</p>
                                </div>
                            ) : (
                                sortedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Catalog;
