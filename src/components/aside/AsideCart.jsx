import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";
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
import AsideCartBox from "./AsideCartBox";
import { useMyStore } from "../../hooks/useMyStore";

const AsideCart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, auth } = useMyStore();

  useEffect(() => {
    dispatch(getCartPrice());
    dispatch(getCartQuantity());
  }, [dispatch, cart]);

  const viewCartHandler = () => {
    if (auth.isAuthenticated) {
      navigate("/cart");
      dispatch(closeCart());
    } else {
      dispatch(closeCart());
      toast.info("You Must Login First");
      navigate("/login");
    }
  };

  const removeItemHandler = (id) => {
    if (auth.isAuthenticated) {
      dispatch(removeProduct(id));
    } else {
      toast.info("You Must Login First");
    }
  };

  return (
    <Offcanvas
      placement="end"
      show={cart.isCartOpen}
      onHide={() => dispatch(closeCart())}
      className="aside-cart"
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fs-4">Shooping Cart</Offcanvas.Title>
      </Offcanvas.Header>

      {cart.cartData.length === 0 ? (
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
              {cart.cartData.length}
              {cart.cartData.length === 1 ? " Item" : " Items"}
            </span>
            <Button
              size="sm"
              variant="primary"
              className="text-white fw-bold"
              onClick={viewCartHandler}
            >
              View Cart
            </Button>
          </div>

          {cart.cartData.map((product) => (
            <AsideCartBox
              product={product}
              key={product.id}
              removeItemHandler={removeItemHandler}
            />
          ))}

          <div className="foot flex-between fw-bold fs-18 mt-4">
            <p>
              Total Quantity:
              <span className="text-blue ms-2">{cart.cartQuantity}</span>
            </p>
            <p>
              Total Price:
              <span className="text-blue ms-2">
                {formatPrice(cart.cartPrice)}
              </span>
            </p>
          </div>
        </Offcanvas.Body>
      )}
    </Offcanvas>
  );
};

export default AsideCart;
