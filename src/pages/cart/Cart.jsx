import { useDispatch } from "react-redux";
import "./cart.css";
import { useEffect } from "react";
import { clearCart } from "../../store/slices/cartSlice";
import { Button, Col, Container, Row } from "react-bootstrap";
import MayLike from "./MayLike";
import TableRow from "./TableRow";
import PriceBox from "./PriceBox";
import { scrollToTop } from "./../../utils/scrollToTop";
import { useMyStore } from "../../hooks/useMyStore";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const dispatch = useDispatch();
  const { cart } = useMyStore();

  useEffect(() => scrollToTop(), []);

  if (cart.cartData.length === 0) return <EmptyCart />;

  return (
    <Container>
      <div className="cart mb-5">
        <div className="my-4 bg-white shadow p-3 fw-bold fs-4 rounded text-center text-blue text-uppercase">
          Shooping Cart
        </div>

        <Row>
          <Col className="col-sm-12 col-lg-9">
            <div className="cart-list bg-white shadow rounded p-3 mb-3 table-responsive overflow-auto">
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
          </Col>

          <Col className="col-sm-12 col-lg-3">
            <PriceBox cart={cart} />
            <MayLike />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Cart;
