import { useDispatch, useSelector } from "react-redux";
import "./addToCart.css";
import { useEffect } from "react";
import {
  decreaseItemQuantity,
  getProductQuantity,
  increaseItemQuantity,
  removeProduct,
} from "../../store/slices/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const productInCart = cartData.find((item) => item.id === product.id);
  const quantity = productInCart ? productInCart.quantity : 0;

  useEffect(() => {
    dispatch(getProductQuantity(product.id));
  }, [cartData]);

  const increaseItemHandler = () => {
    if (isAuthenticated) {
      dispatch(increaseItemQuantity(product));
    } else {
      toast.info("You Must Login First");
      // navigate("/DollabyReactApp/login");
    }
  };

  const decreaseItemHandler = () => {
    if (isAuthenticated) {
      dispatch(decreaseItemQuantity(product.id));
    } else {
      toast.info("You Must Login First");
      // navigate("/DollabyReactApp/login");
    }
  };

  const removeItemHandler = () => {
    if (isAuthenticated) {
      dispatch(removeProduct(product.id));
    } else {
      toast.info("You Must Login First");
      // navigate("/DollabyReactApp/login");
    }
  };

  return (
    <div className="add-to-cart">
      {quantity === 0 ? (
        <div
          onClick={increaseItemHandler}
          className="add-btn bg-blue text-white
            text-center fw-bold"
        >
          Add To Cart
        </div>
      ) : (
        <div className="text-center">
          <div>
            <span
              onClick={decreaseItemHandler}
              className="inc bg-blue text-white fs-18"
            >
              -
            </span>
            <span className="num mx-2">{quantity}</span>
            <span
              onClick={increaseItemHandler}
              className="dec bg-blue text-white fs-18"
            >
              +
            </span>
          </div>
          <div
            onClick={removeItemHandler}
            className="remove bg-danger text-white my-3 px-2 fs-14"
          >
            Remove
          </div>
        </div>
      )}
    </div>
  );
};

export default AddToCart;
