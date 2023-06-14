import { useRef, useState } from "react";
import "./detailsslide.css";

const DetailsSlide = ({ product }) => {
  const bigImg = useRef();
  const [isActive, setIsActive] = useState(product.images.length - 1);

  return (
    <div className="slider w-100 h-100 mb-4">
      <div className="slider-img">
        <img
          ref={bigImg}
          style={{ height: "300px" }}
          className="w-100 h-100 rounded"
          src={product.thumbnail}
          alt={product.title}
        />
      </div>

      <div className="slider-imgs">
        {product.images.map((img, i) => (
          <div
            key={i}
            onClick={() => setIsActive(i)}
            className={isActive === i ? "active" : ""}
          >
            <img
              onClick={() => (bigImg.current.src = img)}
              src={img}
              alt={product.title}
              className="w-100 h-100 rounded"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailsSlide;
