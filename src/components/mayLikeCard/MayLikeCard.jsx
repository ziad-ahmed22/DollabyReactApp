import { formatPrice } from "../../utils/formatCurrency";
import { Link } from "react-router-dom";
import "./mayLikeCard.css";

const MayLikeCard = ({ product }) => {
  return (
    <Link
      className="may-like-card"
      to={`/products/${product?.id}`}
      key={product?.id}
    >
      <div className="box flex-between rounded mt-2">
        <div className="img rounded p-1">
          <img
            src={product?.thumbnail}
            alt={product?.title}
            className="w-100 h-100"
          />
        </div>

        <div className="info p-2">
          <h6 className="trim-text fs-14 mb-3">{product?.title}</h6>

          <div className="flex-between">
            <span className="fs-14 text-blue">
              {formatPrice(product?.priceAfterDiscount)}
            </span>

            <span className="fs-14 text-danger text-decoration-line-through">
              {formatPrice(product?.price)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MayLikeCard;
