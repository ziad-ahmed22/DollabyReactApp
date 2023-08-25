import { Col, Container, Row } from "react-bootstrap";
import CatList from "./CatList";
import "./products.css";
import { useDispatch } from "react-redux";
import Loading from "../../components/loading/Loading";
import ProductCard from "../../components/productCard/ProductCard";
import Error from "../../components/error/Error";
import { useEffect, useState } from "react";
import ProductsHeader from "./ProductsHeader";
import { fetchAll } from "../../store/slices/categoriesSlice";
import { useMyStore } from "../../hooks/useMyStore";

const Products = () => {
  const dispatch = useDispatch();
  const { categories } = useMyStore();
  const [gridFour, setGridFour] = useState(true);

  useEffect(() => {
    dispatch(fetchAll());
  }, [dispatch]);

  const handleGrid = (status) => setGridFour(status);

  return (
    <Container className="pt-4 pb-5">
      <Row>
        <Col className="col-12 col-md-4 col-lg-3">
          <CatList />
        </Col>

        <Col className="col-12 col-md-8 col-lg-9">
          <ProductsHeader gridFour={gridFour} handleGrid={handleGrid} />

          {categories.loading && <Loading />}

          {!categories.loading &&
          !categories.error &&
          categories.data.length ? (
            <div className={gridFour ? "product-grid-4" : "product-grid-1"}>
              {categories.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <Error msg={categories.error} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Products;
