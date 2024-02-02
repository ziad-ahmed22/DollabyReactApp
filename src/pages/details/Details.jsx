import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useEffect } from "react";

import { ProductDetails } from "../../components/productDetails/ProductDetails";
import { useGetProductQuery } from "../../store/apis/productApi";
import Loading from "./../../components/loading/Loading";
import { scrollToTop } from "../../utils/scrollToTop";
import Error from "./../../components/error/Error";

const Details = () => {
  const { id } = useParams();
  const { data, isError, error, isLoading } = useGetProductQuery(id);

  useEffect(() => scrollToTop(), []);

  if (isLoading) return <Loading />;

  if (isError) return <Error error={error} />;

  return (
    <div className="details py-5">
      <Container>
        <ProductDetails product={data} />
      </Container>
    </div>
  );
};

export default Details;
