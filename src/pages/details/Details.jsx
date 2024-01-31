import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { ProductDetails } from "../../components/productDetails/ProductDetails";
import { fetchProduct } from "../../store/slices/productSlice";
import Loading from "./../../components/loading/Loading";
import { scrollToTop } from "../../utils/scrollToTop";
import { useMyStore } from "../../hooks/useMyStore";
import Error from "./../../components/error/Error";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product } = useMyStore();

  useEffect(() => scrollToTop(), []);

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [dispatch, id]);

  if (product.loading) return <Loading />;

  if (product.error) return <Error msg={product.error} />;

  return (
    <div className="details py-5">
      <Container>
        <ProductDetails product={product.data} />
      </Container>
    </div>
  );
};

export default Details;
