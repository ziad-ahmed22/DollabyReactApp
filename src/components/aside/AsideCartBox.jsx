import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { closeCart } from "../../store/slices/cartSlice";
import { formatPrice } from "../../utils/formatCurrency";

const AsideCartBox = ({ product, removeItemHandler }) => {
  const dispatch = useDispatch();

  return (
    <div
      className="box rounded shadow p-2 d-flex mb-3"
      style={{ border: "1px solid #c7c6c638" }}
    >
      <Link
        to={`/products/${product.id}`}
        onClick={() => dispatch(closeCart())}
      >
        <div className="img" style={{ height: "90px", width: "90px" }}>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-100 h-100 rounded"
          />
        </div>
      </Link>

      <div className="info ms-2" style={{ flex: "1" }}>
        <div className="flex-between mb-3">
          <Link
            to={`/products/${product.id}`}
            onClick={() => dispatch(closeCart())}
          >
            <h6 className="mb-0">{product.title}</h6>
          </Link>

          <span
            className="bg-danger rounded text-white px-1 fw-bold"
            style={{ cursor: "pointer", fontSize: "12px" }}
            onClick={() => removeItemHandler(product.id)}
          >
            Remove
          </span>
        </div>

        <p className="mb-2 fw-bold fs-14">
          Price:
          <span className="text-blue ms-2">
            {formatPrice(product.priceAfterDiscount)}
          </span>
        </p>

        <div className="flex-between fw-bold fs-14">
          <p className="mb-0 ">
            Quantity:
            <span className="text-blue ms-2">{product.quantity}</span>
          </p>
          <p className="mb-0 ">
            Total Price:
            <span className="text-blue ms-2">
              {formatPrice(product.totalPrice)}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AsideCartBox;
