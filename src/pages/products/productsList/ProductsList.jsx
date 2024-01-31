import { useDispatch } from "react-redux";
import { useEffect } from "react";

import { fetchAllCategories } from "../../../store/slices/categoriesSlice";
import ProductCard from "../../../components/productCard/ProductCard";
import Loading from "../../../components/loading/Loading";
import { useMyStore } from "../../../hooks/useMyStore";
import Error from "../../../components/error/Error";
import "./productsList.css";

const ProductsList = ({ gridFour }) => {
  const dispatch = useDispatch();
  const { categories } = useMyStore();

  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  return (
    <div className="products-list">
      {categories.loading && <Loading />}

      {categories.error && !categories.loading && (
        <Error msg={categories.error} />
      )}

      {!categories.error && !categories.loading && (
        <div className={gridFour ? "product-grid-4" : "product-grid-1"}>
          {categories.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsList;
