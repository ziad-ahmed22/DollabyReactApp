import { useState } from "react";
import { Container } from "react-bootstrap";

import { useGetAllProductsQuery } from "../../../store/apis/productApi";
import ProductCard from "../../../components/productCard/ProductCard";
import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";
import "./allProducts.css";

const AllProducts = () => {
  const [end, setEnd] = useState(20);

  const { data, isError, error, isLoading } = useGetAllProductsQuery();

  const loadMore = () => {
    end < data.length && setEnd((prev) => prev + 10);
  };
  const loadLess = () => {
    end > 20 && setEnd((prev) => prev - 10);
  };

  if (isLoading) return <Loading />;

  if (isError) return <Error error={error} />;

  return (
    <div className="all-products">
      {data && (
        <Container>
          <h2 className="title position-relative mb-5">All Products</h2>

          <div className="grid-4 mb-5">
            {data.slice(0, end).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mb-5">
            <span
              className={`less-btn ${end <= 20 ? "disabled" : ""}`}
              onClick={loadLess}
            >
              Load Less
            </span>

            <span
              className={`more-btn ${end >= data.length ? "disabled" : ""}`}
              onClick={loadMore}
            >
              Load More
            </span>
          </div>
        </Container>
      )}
    </div>
  );
};

export default AllProducts;
