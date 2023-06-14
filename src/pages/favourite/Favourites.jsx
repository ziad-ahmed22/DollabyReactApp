import { useDispatch, useSelector } from "react-redux";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import ProductCard from "./../../components/productCard/ProductCard";
import { clearFav } from "../../store/slices/FavouriteSlice";
import { useEffect } from "react";

const Favourites = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.fav);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  if (data.length === 0) {
    return (
      <Container>
        <div className="my-4 bg-white p-3 fw-bold fs-4 rounded shadow text-center text-blue text-uppercase">
          Favourite List
        </div>
        <p className="text-center fs-3 p-5">No Product In List</p>;
      </Container>
    );
  }

  return (
    <div className="fav p-4">
      <Container>
        <div className="my-4 bg-white p-3 fw-bold fs-4 rounded shadow text-center text-blue text-uppercase">
          Favourite List
        </div>

        <div className="flex-between mb-4">
          <Badge className="py-2 px-3">
            {data.length} Item{data.length !== 1 && "s"}
          </Badge>
          <Button
            variant="danger"
            size="sm"
            onClick={() => dispatch(clearFav())}
          >
            Clear List
          </Button>
        </div>

        <div className="fav-list">
          <Row xs={1} sm={2} md={3} lg={4}>
            {data.map((product) => (
              <Col key={product.id} className="mb-3">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Favourites;
