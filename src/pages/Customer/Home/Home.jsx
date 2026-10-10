import "./Home.css";
import Hero from "../../../components/Hero/Hero";
import NewArrivals from "../../../components/NewArrivals/NewArrivals";
import Categories from "../../../components/Categories/Categories";

function Home() {
    return (
        <div className="home-page">

            <Hero />

            <NewArrivals />

            <Categories />

            {/* <section className="trending">
                Trending Collection
            </section>

            <section className="why-agvi">
                Why Choose AGVI
            </section>

            <section className="newsletter">
                Newsletter
            </section> */}

        </div>
    );
}

export default Home;