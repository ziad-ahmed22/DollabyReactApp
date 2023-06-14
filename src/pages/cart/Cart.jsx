import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import { useEffect } from "react";
import {
  clearCart,
  closeCart,
  decreaseItemQuantity,
  getCartPrice,
  getCartQuantity,
  increaseItemQuantity,
  removeProduct,
} from "../../store/slices/cartSlice";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatPrice } from "./../../utils/formatCurrency";
import img from "./empty-cart.png";
import MayLike from "./MayLike";

const Cart = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCartPrice());
    dispatch(getCartQuantity());
  }, [state]);

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
                  {state.cartData.map((product) => (
                    <tr key={product.id} className="text-center">
                      <td>
                        <div className="img">
                          <Link
                            to={`/products/${product.id}`}
                            onClick={() => dispatch(closeCart())}
                          >
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
                          onClick={() =>
                            dispatch(decreaseItemQuantity(product.id))
                          }
                          className="inc"
                        >
                          -
                        </span>
                        <span className="num mx-2 d-inline-block">
                          {product.quantity}
                        </span>
                        <span
                          onClick={() =>
                            dispatch(increaseItemQuantity(product))
                          }
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
            <div className="checkout bg-white shadow rounded mb-3 p-2 fs-18 fw-bold">
              <div className="flex-between py-2 mb-2">
                Items:
                <span className="text-blue">{state.cartData.length}</span>
              </div>

              <div className="flex-between py-2 mb-2">
                Total Quantity:
                <span className="text-blue">{state.cartQuantity}</span>
              </div>

              <div className="flex-between py-2">
                Total Price:
                <span className="text-blue">
                  {formatPrice(state.cartPrice)}
                </span>
              </div>
            </div>
            <MayLike />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Cart;
