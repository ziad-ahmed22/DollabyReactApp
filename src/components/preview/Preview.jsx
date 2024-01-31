import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { ProductDetails } from "../productDetails/ProductDetails";
import { closePreview } from "../../store/slices/previewSlice";
import { useMyStore } from "../../hooks/useMyStore";
import Loading from "./../loading/Loading";
import Error from "./../error/Error";
import "./preview.css";

const Preview = () => {
  const dispatch = useDispatch();
  const { preview } = useMyStore();

  return (
    <Modal
      show={preview.isOpen}
      onHide={() => dispatch(closePreview())}
      size="xl"
      centered
    >
      <Modal.Header closeButton></Modal.Header>

      {preview.loading ? (
        <Loading />
      ) : preview.error ? (
        <Error msg={preview.error} />
      ) : (
        <Modal.Body>
          <ProductDetails product={preview.data} />
        </Modal.Body>
      )}
    </Modal>
  );
};

export default Preview;
