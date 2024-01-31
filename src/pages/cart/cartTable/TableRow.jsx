import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import {
  decreaseItemQuantity,
  increaseItemQuantity,
  removeProduct,
} from "../../../store/slices/cartSlice";
import { formatPrice } from "../../../utils/formatCurrency";

const TableRow = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <tr className="text-center">
      <td>
        <div className="img">
          <Link to={`/products/${product.id}`}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-100 h-100"
            />
          </Link>
        </div>
      </td>

      <td>{product.title}</td>

      <td>{formatPrice(product.priceAfterDiscount)}</td>

      <td>
        <span
          onClick={() => dispatch(decreaseItemQuantity(product.id))}
          className="inc"
        >
          -
        </span>

        <span className="num mx-2 d-inline-block">{product.quantity}</span>

        <span
          onClick={() => dispatch(increaseItemQuantity(product))}
          className="dec"
        >
          +
        </span>
      </td>

      <td>{formatPrice(product.totalPrice)}</td>

      <td>
        <span
          onClick={() => dispatch(removeProduct(product.id))}
          className="bg-danger rounded text-white p-1 fs-14"
          style={{ cursor: "pointer" }}
        >
          Remove
        </span>
      </td>
    </tr>
  );
};

export default TableRow;
