import { Col, Container, Row } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import CatList from "./CatList";
import "./products.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/loading/Loading";
import ProductCard from "../../components/productCard/ProductCard";
import Error from "../../components/error/Error";
import { useEffect, useState } from "react";
import ProductsHeader from "./ProductsHeader";
import { fetchAll } from "../../store/slices/categoriesSlice";

const Products = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.categories);
  const [gridThree, setGridThree] = useState(true);

  useEffect(() => {
    dispatch(fetchAll());
  }, []);

  const handleGrid = (status) => {
    setGridThree(status);
  };

  return (
    <Container className="pt-4 pb-5">
      <Row>
        <Col className="col-12 col-md-4 col-lg-3">
          <CatList />
        </Col>

        <Col className="col-12 col-md-8 col-lg-9">
          <ProductsHeader gridThree={gridThree} handleGrid={handleGrid} />

          {state.loading && <Loading />}

          <div className={gridThree ? "product-grid-4" : "product-grid-1"}>
            {!state.loading && !state.error && state.data.length ? (
              state.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <Error msg={state.error} />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
