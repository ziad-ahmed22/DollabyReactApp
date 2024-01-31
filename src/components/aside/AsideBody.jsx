import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { closeCart, removeProduct } from "../../store/slices/cartSlice";
import { formatPrice } from "./../../utils/formatCurrency";
import { useMyStore } from "../../hooks/useMyStore";
import AsideCard from "../asideCard/AsideCard";

export const AsideBody = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, auth } = useMyStore();

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
    <>
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
        <AsideCard
          key={product.id}
          product={product}
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
          <span className="text-blue ms-2">{formatPrice(cart.cartPrice)}</span>
        </p>
      </div>
    </>
  );
};
