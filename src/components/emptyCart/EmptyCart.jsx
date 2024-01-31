import { Button, Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { closeCart } from "../../store/slices/cartSlice";
import img from "../../assets/images/empty-cart.png";

const EmptyCart = () => {
  const dispatch = useDispatch();

  return (
    <Container>
      <div className="py-5 d-flex flex-column align-items-center">
        <div className="mb-3 text-center">
          <img src={img} alt="empty cart img" className="w-75" />
        </div>
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
    </Container>
  );
};

export default EmptyCart;
