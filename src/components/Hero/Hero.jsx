import "./Hero.css";
import { useState, useEffect } from "react";
import heroSlides from "./heroData";

function Hero() {

    const [currentSlide, setCurrentSlide] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {

        if (paused) return;

        const interval = setInterval(() => {

            setCurrentSlide((prev) =>
                prev === heroSlides.length - 1 ? 0 : prev + 1
            );

        }, 5000);

        return () => clearInterval(interval);

    }, [paused]);

    const nextSlide = () => {

        setCurrentSlide((prev) =>
            prev === heroSlides.length - 1 ? 0 : prev + 1
        );

    };

    const prevSlide = () => {

        setCurrentSlide((prev) =>
            prev === 0 ? heroSlides.length - 1 : prev - 1
        );

    };

    return (

        <section
            className="hero"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >

            <div
                className="hero-banner fade-slide"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,.35),rgba(0,0,0,.35)),url(${heroSlides[currentSlide].image})`
                }}
            >

                <div className="container hero-content">

                    <span className="hero-tag">
                        {heroSlides[currentSlide].title}
                    </span>

                    <h1>
                        {heroSlides[currentSlide].heading}
                    </h1>

                    <p>
                        {heroSlides[currentSlide].description}
                    </p>

                    <button className="hero-btn">
                        {heroSlides[currentSlide].button}
                    </button>

                </div>

                <button
                    className="hero-arrow left-arrow"
                    onClick={prevSlide}
                >
                    ❮
                </button>

                <button
                    className="hero-arrow right-arrow"
                    onClick={nextSlide}
                >
                    ❯
                </button>

                <div className="hero-dots">

                    {heroSlides.map((slide, index) => (

                        <span
                            key={slide.id}
                            className={
                                currentSlide === index
                                    ? "dot active-dot"
                                    : "dot"
                            }
                            onClick={() => setCurrentSlide(index)}
                        ></span>

                    ))}

                </div>

            </div>

        </section>

    );
}

export default Hero;