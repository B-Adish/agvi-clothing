import "./ProductGallery.css";
import { useState } from "react";

function ProductGallery({ product }) {

    const [selectedImage, setSelectedImage] = useState(0);

    const [backgroundPosition, setBackgroundPosition] =
        useState("50% 50%");

    const handleZoom = (e) => {

        const { left, top, width, height } =
            e.target.getBoundingClientRect();

        const x =
            ((e.clientX - left) / width) * 100;

        const y =
            ((e.clientY - top) / height) * 100;

        setBackgroundPosition(`${x}% ${y}%`);

    };

    return (

        <div className="product-gallery">

            <div
                className="gallery-main zoom-container"
                onMouseMove={handleZoom}
            >

                <div
                    className="zoom-image"
                    style={{
                        backgroundImage:`url(${product.images[selectedImage]})`,
                        backgroundPosition
                    }}
                >

                    <img
                        src={product.images[selectedImage]}
                        alt={product.name}
                    />

                </div>

            </div>

            <div className="gallery-thumbnails">

                {product.images.map((image,index)=>(

                    <img
                        key={index}
                        src={image}
                        alt={product.name}
                        className={
                            selectedImage===index
                                ? "active-thumb"
                                : ""
                        }
                        onClick={() =>
                            setSelectedImage(index)
                        }
                    />

                ))}

            </div>

        </div>

    );

}

export default ProductGallery;