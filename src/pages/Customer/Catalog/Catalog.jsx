import "./Catalog.css";
import { useState } from "react";
import ProductCard from "../../../components/ProductCard/ProductCard";
import products from "../../../data/productData";
import { useSearch } from "../../../context/SearchContext";

function Catalog() {
    const { searchQuery } = useSearch();

    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedSubCategory, setSelectedSubCategory] = useState("All");

    const [minPriceInput, setMinPriceInput] = useState("0");
    const [maxPriceInput, setMaxPriceInput] = useState("5000");

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);

    const [sortBy, setSortBy] = useState("Newest");

    const applyFilters = () => {
        const from = minPriceInput === "" ? 0 : Number(minPriceInput);
        const to = maxPriceInput === "" ? 5000 : Number(maxPriceInput);

        if (from > to) {
            alert("From price cannot be greater than To price.");
            return;
        }

        setMinPrice(Math.max(0, from));
        setMaxPrice(Math.min(5000, to));
    };

    const resetFilters = () => {
        setSelectedCategory("All");
        setSelectedSubCategory("All");

        setMinPriceInput("0");
        setMaxPriceInput("5000");

        setMinPrice(0);
        setMaxPrice(5000);

        setSortBy("Newest");
    };

    const filteredProducts = products.filter((product) => {
        const search = searchQuery.toLowerCase().trim();

        const matchesSearch =
            product.name.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search) ||
            product.subcategory.toLowerCase().includes(search);

        const matchesCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

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
    }

    if (sortBy === "HighToLow") {
        sortedProducts.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "Popularity") {
        sortedProducts.sort((a, b) => b.rating - a.rating);
    }

    return (
        <section className="catalog">
            <div className="container">

                <div className="catalog-header">
                    <h1>Catalog</h1>
                    <p>
                        Discover Premium Fashion For Women & Kids
                    </p>
                </div>

                <div className="catalog-layout">

                    <aside className="catalog-sidebar">

                        <h3>Categories</h3>

                        <ul className="category-list">

                            <li
                                className={
                                    selectedCategory === "All"
                                        ? "active-category"
                                        : ""
                                }
                                onClick={() => {
                                    setSelectedCategory("All");
                                    setSelectedSubCategory("All");
                                }}
                            >
                                All
                            </li>

                            <li
                                className={
                                    selectedCategory === "Women"
                                        ? "active-category"
                                        : ""
                                }
                                onClick={() => {
                                    setSelectedCategory("Women");
                                    setSelectedSubCategory("All");
                                }}
                            >
                                Women
                            </li>

                            <li
                                className={
                                    selectedCategory === "Kids"
                                        ? "active-category"
                                        : ""
                                }
                                onClick={() => {
                                    setSelectedCategory("Kids");
                                    setSelectedSubCategory("All");
                                }}
                            >
                                Kids
                            </li>

                        </ul>

                        <hr />

                        <h3>Sub Categories</h3>

                        <ul className="category-list">

                            <li
                                className={
                                    selectedSubCategory === "All"
                                        ? "active-category"
                                        : ""
                                }
                                onClick={() =>
                                    setSelectedSubCategory("All")
                                }
                            >
                                All
                            </li>

                            {selectedCategory === "Women" && (
                                <>
                                    <li
                                        className={
                                            selectedSubCategory === "Kurti"
                                                ? "active-category"
                                                : ""
                                        }
                                        onClick={() =>
                                            setSelectedSubCategory("Kurti")
                                        }
                                    >
                                        Kurti
                                    </li>

                                    <li
                                        className={
                                            selectedSubCategory === "Maxi"
                                                ? "active-category"
                                                : ""
                                        }
                                        onClick={() =>
                                            setSelectedSubCategory("Maxi")
                                        }
                                    >
                                        Maxi
                                    </li>

                                    <li
                                        className={
                                            selectedSubCategory === "Short Tops"
                                                ? "active-category"
                                                : ""
                                        }
                                        onClick={() =>
                                            setSelectedSubCategory("Short Tops")
                                        }
                                    >
                                        Short Tops
                                    </li>

                                    <li
                                        className={
                                            selectedSubCategory === "Co-ord Set"
                                                ? "active-category"
                                                : ""
                                        }
                                        onClick={() =>
                                            setSelectedSubCategory("Co-ord Set")
                                        }
                                    >
                                        Co-ord Set
                                    </li>

                                    <li
                                        className={
                                            selectedSubCategory === "Ethnic Wear"
                                                ? "active-category"
                                                : ""
                                        }
                                        onClick={() =>
                                            setSelectedSubCategory("Ethnic Wear")
                                        }
                                    >
                                        Ethnic Wear
                                    </li>
                                </>
                            )}

                            {selectedCategory === "Kids" && (
                                <>
                                    <li
                                        className={
                                            selectedSubCategory === "Frocks"
                                                ? "active-category"
                                                : ""
                                        }
                                        onClick={() =>
                                            setSelectedSubCategory("Frocks")
                                        }
                                    >
                                        Frocks
                                    </li>

                                    <li
                                        className={
                                            selectedSubCategory === "Co-ord"
                                                ? "active-category"
                                                : ""
                                        }
                                        onClick={() =>
                                            setSelectedSubCategory("Co-ord")
                                        }
                                    >
                                        Co-ord
                                    </li>

                                    <li
                                        className={
                                            selectedSubCategory === "Ethnic Wear"
                                                ? "active-category"
                                                : ""
                                        }
                                        onClick={() =>
                                            setSelectedSubCategory("Ethnic Wear")
                                        }
                                    >
                                        Ethnic Wear
                                    </li>
                                </>
                            )}

                        </ul>

                        <hr />

                        <h3>Price</h3>

                        <div className="price-inputs">

                            <div className="price-field">
                                <label htmlFor="min-price">
                                    From
                                </label>

                                <div className="price-input-wrapper">
                                    <span>₹</span>

                                    <input
                                        id="min-price"
                                        type="number"
                                        min="0"
                                        max="5000"
                                        placeholder="0"
                                        value={minPriceInput}
                                        onChange={(e) =>
                                            setMinPriceInput(e.target.value)
                                        }
                                    />
                                </div>
                            </div>

                            <div className="price-field">
                                <label htmlFor="max-price">
                                    To
                                </label>

                                <div className="price-input-wrapper">
                                    <span>₹</span>

                                    <input
                                        id="max-price"
                                        type="number"
                                        min="0"
                                        max="5000"
                                        placeholder="5000"
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
                            onChange={(e) =>
                                setSortBy(e.target.value)
                            }
                        >
                            <option value="Newest">
                                Newest
                            </option>

                            <option value="LowToHigh">
                                Price : Low to High
                            </option>

                            <option value="HighToLow">
                                Price : High to Low
                            </option>

                            <option value="Popularity">
                                Popularity
                            </option>
                        </select>

                    </aside>

                    <div className="catalog-content">

                        <div className="catalog-topbar">
                            <p>
                                Showing{" "}
                                <strong>
                                    {sortedProducts.length}
                                </strong>{" "}
                                Products
                            </p>
                        </div>

                        <div className="catalog-products">

                            {sortedProducts.length === 0 ? (
                                <div className="no-products">
                                    <h2>No Products Found</h2>

                                    <p>
                                        Try another search or filter.
                                    </p>
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