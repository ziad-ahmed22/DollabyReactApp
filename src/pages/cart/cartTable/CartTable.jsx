import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

import { clearCart } from "../../../store/slices/cartSlice";
import { scrollToTop } from "../../../utils/scrollToTop";
import { useMyStore } from "../../../hooks/useMyStore";
import TableRow from "./TableRow";
import "./cartTable.css";

const CartTable = () => {
  const dispatch = useDispatch();
  const { cart } = useMyStore();

  return (
    <div className="cart-table bg-white shadow rounded p-3 mb-3 table-responsive overflow-auto">
      <table className="w-100" style={{ minWidth: "600px" }}>
        <thead>
          <tr className="text-center">
            <th>Image</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartData.map((product, i) => (
            <TableRow product={product} key={i} />
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={6} className="text-center">
              <Button
                variant="danger px-5 mt-3"
                onClick={() => {
                  dispatch(clearCart());
                  scrollToTop();
                }}
              >
                Clear Cart
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CartTable;
