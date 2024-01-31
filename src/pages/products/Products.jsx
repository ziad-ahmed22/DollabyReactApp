import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import ProductsHeader from "./productHeader/ProductsHeader";
import ProductsList from "./productsList/ProductsList";
import { scrollToTop } from "../../utils/scrollToTop";
import CatList from "./catList/CatList";

const Products = () => {
  const [gridFour, setGridFour] = useState(true);
  const handleGrid = (status) => setGridFour(status);

  useEffect(() => scrollToTop(), []);

  return (
    <div className="products">
      <Container className="pt-4 pb-5">
        <Row>
          <Col className="col-12 col-md-4 col-lg-3">
            <CatList />
          </Col>

          <Col className="col-12 col-md-8 col-lg-9">
            <ProductsHeader gridFour={gridFour} handleGrid={handleGrid} />

            <ProductsList gridFour={gridFour} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Products;
