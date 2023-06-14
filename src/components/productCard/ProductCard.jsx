import { BsEyeFill, BsLink45Deg, BsStarFill } from "react-icons/bs";
import "./productCard.css";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import Love from "../love/Love";
import { formatPrice } from "./../../utils/formatCurrency";
import AddToCart from "../addToCart/AddToCart";
import { useDispatch } from "react-redux";
import {
  fetchModalProduct,
  openPreview,
} from "../../store/slices/previewSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const previewHandler = () => {
    dispatch(fetchModalProduct(product.id));
    dispatch(openPreview());
  };

  const starsArr = [];
  for (let i = 0; i < product.ratingStars; i++) {
    starsArr.push(<BsStarFill key={i} />);
  }

  return (
    <div className="card-p bg-white position-relative shadow overflow-hidden">
      <div className="img overflow-hidden position-relative ">
        {product.thumbnail && (
          <img src={product.thumbnail} alt={product.title} />
        )}

        <div className="stars">{starsArr}</div>
      </div>

      <div className="body px-2 py-3">
        <Link to={`/products/${product.id}`}>
          <h6 className="mb-3">
            {product.title.length > 20
              ? product.title.slice(0, 20) + "..."
              : product.title}
          </h6>
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

        <a
          data-tooltip-id={product.id}
          data-tooltip-content="Add To Favourite List"
          data-tooltip-place="left"
        >
          <Love product={product} />
        </a>

        <a
          data-tooltip-id={product.id}
          data-tooltip-content="Preview"
          data-tooltip-place="left"
        >
          <BsEyeFill onClick={previewHandler} />
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
