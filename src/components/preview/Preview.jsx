import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";

import { ProductDetails } from "../productDetails/ProductDetails";
import { useGetProductQuery } from "../../store/apis/productApi";
import { closePreview } from "../../store/slices/previewSlice";
import { useMyStore } from "../../hooks/useMyStore";
import Loading from "./../loading/Loading";
import Error from "./../error/Error";
import "./preview.css";

const Preview = () => {
  const dispatch = useDispatch();
  const { preview } = useMyStore();
  const { data, isError, error, isLoading } = useGetProductQuery(
    preview.productId
  );

  return (
    <Modal
      show={preview.isOpen}
      onHide={() => dispatch(closePreview())}
      size="xl"
      centered
    >
      <Modal.Header closeButton></Modal.Header>

      {isLoading ? (
        <Loading />
      ) : isError ? (
        <Error error={error} />
      ) : (
        <Modal.Body>
          <ProductDetails product={data} />
        </Modal.Body>
      )}
    </Modal>
  );
};

export default Preview;
