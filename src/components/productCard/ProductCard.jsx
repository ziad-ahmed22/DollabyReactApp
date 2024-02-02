import { BsEyeFill, BsLink45Deg } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { openPreview } from "../../store/slices/previewSlice";
import { formatPrice } from "./../../utils/formatCurrency";
import StarsRating from "../starsRating/StarsRating";
import AddToCart from "../addToCart/AddToCart";
import Love from "../love/Love";
import "./productCard.css";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="card-p bg-white position-relative shadow overflow-hidden">
      <div className="img overflow-hidden position-relative ">
        {product.thumbnail && (
          <img src={product.thumbnail} alt={product.title} />
        )}

        <StarsRating rating={product.ratingStars} />
      </div>

      <div className="body px-2 py-3">
        <Link to={`/products/${product.id}`}>
          <h6 className="mb-3 trim-text">{product.title}</h6>
        </Link>

        <div className="flex-between mb-3 fs-14 fw-bold">
          <span>{formatPrice(product.priceAfterDiscount)}</span>
          <span className="text-decoration-line-through text-danger">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>

      <div className="foot">
        <AddToCart product={product} />
      </div>

      <div className="over">
        <Tooltip id={product.id} className="bg-blue" />

        <Love product={product} />

        <a
          data-tooltip-id={product.id}
          data-tooltip-content="Preview"
          data-tooltip-place="left"
        >
          <BsEyeFill onClick={() => dispatch(openPreview(product.id))} />
        </a>

        <Link
          to={`/products/${product.id}`}
          data-tooltip-id={product.id}
          data-tooltip-content="Details"
          data-tooltip-place="left"
        >
          <BsLink45Deg />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
