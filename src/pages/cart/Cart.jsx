import { Col, Container, Row } from "react-bootstrap";
import { useEffect } from "react";

import PageTitle from "../../components/pageTitle/PageTitle";
import EmptyCart from "../../components/emptyCart/EmptyCart";
import { scrollToTop } from "../../utils/scrollToTop";
import { useMyStore } from "../../hooks/useMyStore";
import CartTable from "./cartTable/CartTable";
import PriceBox from "./priceBox/PriceBox";
import MayLike from "./mayLike/MayLike";

const Cart = () => {
  const { cart } = useMyStore();

  useEffect(() => scrollToTop(), []);

  return (
    <div className="cart mb-5">
      <Container>
        <PageTitle title="Shooping Cart" />

        {cart.cartData.length === 0 ? (
          <EmptyCart />
        ) : (
          <Row>
            <Col className="col-sm-12 col-lg-9">
              <CartTable />
            </Col>

            <Col className="col-sm-12 col-lg-3">
              <PriceBox />
              <MayLike />
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Cart;
