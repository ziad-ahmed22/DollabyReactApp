import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import {
  closeCart,
  getCartPrice,
  getCartQuantity,
} from "../../store/slices/cartSlice";
import { useMyStore } from "../../hooks/useMyStore";
import EmptyCart from "../emptyCart/EmptyCart";
import { AsideBody } from "./AsideBody";

const Aside = () => {
  const dispatch = useDispatch();
  const { cart } = useMyStore();

  useEffect(() => {
    dispatch(getCartPrice());
    dispatch(getCartQuantity());
  }, [dispatch, cart]);

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
        <EmptyCart />
      ) : (
        <Offcanvas.Body>
          <AsideBody />
        </Offcanvas.Body>
      )}
    </Offcanvas>
  );
};

export default Aside;
