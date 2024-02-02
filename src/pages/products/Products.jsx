import { Col, Container, Row } from "react-bootstrap";
import { useEffect, useState } from "react";

import ProductsList from "./productsList/ProductsList";
import { scrollToTop } from "../../utils/scrollToTop";
import CatList from "./catList/CatList";

const Products = () => {
  const [activeCat, setActiveCat] = useState(0);
  const [category, setCategory] = useState("all");

  const handleAllCatClick = () => {
    setActiveCat(0);
    setCategory("all");
  };

  const handleCatClick = (e, index) => {
    setActiveCat(index + 1);
    setCategory(e.currentTarget.dataset.val);
  };

  useEffect(() => scrollToTop(), []);

  return (
    <div className="products">
      <Container className="pt-4 pb-5">
        <Row>
          <Col className="col-12 col-md-4 col-lg-3">
            <CatList
              handleAllCatClick={handleAllCatClick}
              handleCatClick={handleCatClick}
              activeCat={activeCat}
            />
          </Col>

          <Col className="col-12 col-md-8 col-lg-9">
            <ProductsList category={category} />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Products;
