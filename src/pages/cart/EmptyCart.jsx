import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import img from "./empty-cart.png";

const EmptyCart = () => {
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
};

export default EmptyCart;
