import { Col, Container, Row } from "react-bootstrap";
import Love from "../../components/love/Love";
import "./details.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import DetailsSlide from "./DetailsSlide";
import Loading from "./../../components/loading/Loading";
import Error from "./../../components/error/Error";
import { useDispatch } from "react-redux";
import { fetchProduct } from "../../store/slices/productSlice";
import { formatPrice } from "../../utils/formatCurrency";
import AddToCart from "../../components/addToCart/AddToCart";
import { BsStarFill } from "react-icons/bs";
import { scrollToTop } from "../../utils/scrollToTop";
import { useMyStore } from "../../hooks/useMyStore";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useMyStore();

  useEffect(() => {
    dispatch(fetchProduct(id));
    scrollToTop();
  }, [dispatch, id]);

  const starsArr = [];
  for (let i = 0; i < product.ratingStars; i++) {
    starsArr.push(<BsStarFill className="mx-1" key={i} />);
  }

  if (product.loading) return <Loading />;

  if (product.error) return <Error msg={product.error} />;

  return (
    <div className="details py-5">
      <Container>
        <Row xs={1} sm={1} md={2}>
          <Col className="order-last order-md-first">
            <div className="img">
              {product.data.thumbnail && (
                <DetailsSlide product={product.data} />
              )}
            </div>
          </Col>

          <Col className="order-first order-md-last">
            <div className="info">
              <h2 className="mb-4">{product.data.title}</h2>

              <div className="body">
                <p className="fs-18">{product.data.description}</p>

                <span className="bg-blue text-white rounded  py-1 px-2">
                  {product.data.stock} In Stock
                </span>

                <div className="fw-bold mt-3">Brand: {product.data.brand}</div>

                <div className="text-warning my-3">{starsArr}</div>

                <div className="price mb-4 fs-18 fw-bold">
                  <span className="me-4">
                    {formatPrice(product.data.priceAfterDiscount)}
                  </span>
                  <span className="text-danger  text-decoration-line-through">
                    {formatPrice(product.data.price)}
                  </span>
                </div>
              </div>

              <div className="foot flex-between mb-4">
                <AddToCart product={product.data} />
                <Love product={product.data} />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Details;
