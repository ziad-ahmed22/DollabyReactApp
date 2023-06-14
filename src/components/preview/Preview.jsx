import { Col, Modal, Row } from "react-bootstrap";
import "./preview.css";
import { useDispatch, useSelector } from "react-redux";
import DetailsSlide from "../../pages/details/DetailsSlide";
import { formatPrice } from "../../utils/formatCurrency";
import AddToCart from "../addToCart/AddToCart";
import Love from "../love/Love";
import { closePreview } from "../../store/slices/previewSlice";
import Loading from "./../loading/Loading";
import Error from "./../error/Error";
import { BsStarFill } from "react-icons/bs";

const Preview = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.preview);

  return (
    <Modal
      show={state.isOpen}
      onHide={() => dispatch(closePreview())}
      size="xl"
      centered
    >
      <Modal.Header closeButton></Modal.Header>

      {state.loading ? (
        <Loading />
      ) : state.error ? (
        <Error msg={state.error} />
      ) : (
        <ModalBody product={state.data} />
      )}
    </Modal>
  );
};

const ModalBody = ({ product }) => {
  const starsArr = [];
  for (let i = 0; i < product.ratingStars; i++) {
    starsArr.push(<BsStarFill className="mx-1" key={i} />);
  }

  return (
    <Modal.Body>
      <Row xs={1} lg={2}>
        <Col className="order-last order-lg-first">
          <div className="img">
            {product.thumbnail && <DetailsSlide product={product} />}
          </div>
        </Col>

        <Col className="order-first order-lg-last">
          <div className="info">
            <h2 className="mb-4">{product.title}</h2>

            <div className="body">
              <p className="fs-18">{product.description}</p>

              <span className="bg-blue text-white rounded  py-1 px-2">
                {product.stock} In Stock
              </span>

              <div className="fw-bold mt-3">Brand: {product.brand}</div>

              <div className="text-warning my-3">{starsArr}</div>

              <div className="price mb-4 fs-18 fw-bold">
                <span className="me-4">
                  {formatPrice(product.priceAfterDiscount)}
                </span>
                <span className="text-danger  text-decoration-line-through">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>

            <div className="foot flex-between mb-4">
              <AddToCart product={product} />

              <Love product={product} />
            </div>
          </div>
        </Col>
      </Row>
    </Modal.Body>
  );
};

export default Preview;
