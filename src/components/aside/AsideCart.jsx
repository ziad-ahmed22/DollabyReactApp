import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch, useSelector } from "react-redux";
import {
  closeCart,
  getCartPrice,
  getCartQuantity,
  removeProduct,
} from "../../store/slices/cartSlice";
import { formatPrice } from "./../../utils/formatCurrency";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import img from "./empty-cart.png";
import { toast } from "react-toastify";

const AsideCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCartPrice());
    dispatch(getCartQuantity());
  }, [state]);

  const viewCartHandler = () => {
    if (isAuthenticated) {
      navigate("/cart");
      dispatch(closeCart());
    } else {
      dispatch(closeCart());
      navigate("/cart");
      toast.info("You Must Login First");
    }
  };

  const removeItemHandler = (id) => {
    if (isAuthenticated) {
      dispatch(removeProduct(id));
    } else {
      toast.info("You Must Login First");
      // navigate("/login");
    }
  };

  return (
    <Offcanvas
      placement="end"
      show={state.isCartOpen}
      onHide={() => dispatch(closeCart())}
      className="aside-cart"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fs-4">Shooping Cart</Offcanvas.Title>
      </Offcanvas.Header>

      {state.cartData.length === 0 ? (
        <div className="text-center mt-5">
          <img src={img} alt="empty cart img" className="w-100 mb-3" />
          <Button
            as={Link}
            to="/products"
            variant="primary"
            className="text-white fw-bold"
            onClick={() => dispatch(closeCart())}
          >
            Go To Shop
          </Button>
        </div>
      ) : (
        <Offcanvas.Body>
          <div className="head flex-between mb-3">
            <span className="bg-info rounded text-white px-1 fw-bold">
              {state.cartData.length}
              {state.cartData.length === 1 ? " Item" : " Items"}
            </span>
            <Button
              // as={Link}
              // to="/cart"
              size="sm"
              variant="primary"
              className="text-white fw-bold"
              onClick={viewCartHandler}
            >
              View Cart
            </Button>
          </div>

          {state.cartData.map((product) => (
            <div
              key={product.id}
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
          ))}

          <div className="foot flex-between fw-bold fs-18 mt-4">
            <p>
              Total Quantity:
              <span className="text-blue ms-2">{state.cartQuantity}</span>
            </p>
            <p>
              Total Price:
              <span className="text-blue ms-2">
                {formatPrice(state.cartPrice)}
              </span>
            </p>
          </div>
        </Offcanvas.Body>
      )}
    </Offcanvas>
  );
};

export default AsideCart;
