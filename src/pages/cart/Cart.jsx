import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import { useEffect } from "react";
import { clearCart } from "../../store/slices/cartSlice";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import img from "./empty-cart.png";
import MayLike from "./MayLike";
import TableRow from "./TableRow";
import PriceBox from "./PriceBox";

const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => goToTop(), []);

  if (state.cartData.length === 0) {
    return (
      <Container>
        <div className="my-4 bg-white p-3 fw-bold fs-4 rounded shadow text-center text-blue text-uppercase">
          Shooping Cart
        </div>
        <div className="py-5 d-flex flex-column align-items-center">
          <div className="mb-3 text-center">
            <img src={img} alt="empty cart img" className="w-75" />
          </div>
          <Button
            as={Link}
            to="/products"
            variant="primary"
            className="text-white fw-bold"
          >
            Go To Shop
          </Button>
        </div>
      </Container>
    );
  }

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
                  {state.cartData.map((product, i) => (
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
                          goToTop();
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
            <PriceBox state={state} />
            <MayLike />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Cart;
