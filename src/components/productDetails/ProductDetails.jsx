import { Col, Row } from "react-bootstrap";

import ProductDetailsSlide from "../productDetailsSlide/ProductDetailsSlide";
import { formatPrice } from "../../utils/formatCurrency";
import StarsRating from "../starsRating/StarsRating";
import AddToCart from "../addToCart/AddToCart";
import Love from "../love/Love";
import "./productDetails.css";

export const ProductDetails = ({ product }) => {
  return (
    <div className="product-details">
      <Row xs={1} lg={2}>
        <Col className="order-last order-lg-first">
          <div className="img">
            {product.thumbnail && <ProductDetailsSlide product={product} />}
          </div>
        </Col>

        <Col className="order-first order-lg-last">
          <div className="info">
            <h2 className="mb-4">{product.title}</h2>

            <div className="body">
              <p className="fs-18">{product.description}</p>

              <span className="bg-blue text-white rounded  py-1 px-2">
                {product.stock} In Stock
              </span>

              <div className="fw-bold mt-3">Brand: {product.brand}</div>

              <div className="text-warning my-3">
                <StarsRating rating={product.ratingStars} />
              </div>

              <div className="price mb-4 fs-18 fw-bold">
                <span className="me-4">
                  {formatPrice(product.priceAfterDiscount)}
                </span>
                <span className="text-danger text-decoration-line-through">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>

            <div className="foot flex-between mb-4">
              <AddToCart product={product} />

              <Love product={product} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};
