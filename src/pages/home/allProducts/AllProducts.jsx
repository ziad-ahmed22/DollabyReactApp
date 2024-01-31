import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { fetchAllProducts } from "../../../store/slices/allProductSlice";
import ProductCard from "../../../components/productCard/ProductCard";
import Loading from "../../../components/loading/Loading";
import { useMyStore } from "../../../hooks/useMyStore";
import Error from "../../../components/error/Error";
import "./allProducts.css";

const AllProducts = () => {
  const dispatch = useDispatch();
  const { allProducts } = useMyStore();
  const [end, setEnd] = useState(20);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const loadMore = () => {
    end < allProducts.data.length && setEnd((prev) => prev + 10);
  };
  const loadLess = () => {
    end > 20 && setEnd((prev) => prev - 10);
  };

  if (allProducts.loading) return <Loading />;

  if (allProducts.error) return <Error msg={allProducts.error} />;

  return (
    <div className="all-products">
      {allProducts?.data && (
        <Container>
          <h2 className="title position-relative mb-5">All Products</h2>

          <div className="grid-4 mb-5">
            {allProducts.data.slice(0, end).map((product) => (
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
              className={`more-btn ${
                end >= allProducts.data.length ? "disabled" : ""
              }`}
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
