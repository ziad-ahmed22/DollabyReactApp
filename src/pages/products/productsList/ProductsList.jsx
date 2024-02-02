import { useEffect, useState } from "react";

import { useGetCatProductsQuery } from "../../../store/apis/productApi";
import ProductCard from "../../../components/productCard/ProductCard";
import ProductsHeader from "../productHeader/ProductsHeader";
import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";
import "./productsList.css";

const ProductsList = ({ category }) => {
  const [isGrid, setIsGrid] = useState(true);
  const handleGrid = (status) => setIsGrid(status);

  const { data, isError, error, isLoading } = useGetCatProductsQuery(category);
  const [finalData, setFinalData] = useState([]);

  useEffect(() => {
    setFinalData(data);
  }, [data]);

  const priceLowToHigh = () => {
    const sortedData = [...finalData];
    sortedData.sort((x, y) => x.priceAfterDiscount - y.priceAfterDiscount);
    setFinalData(sortedData);
  };

  const priceHighToLow = () => {
    const sortedData = [...finalData];
    sortedData.sort((x, y) => y.priceAfterDiscount - x.priceAfterDiscount);
    setFinalData(sortedData);
  };

  return (
    <>
      <ProductsHeader
        isGrid={isGrid}
        handleGrid={handleGrid}
        priceHighToLow={priceHighToLow}
        priceLowToHigh={priceLowToHigh}
      />

      <div className="products-list">
        {isLoading && <Loading />}

        {isError && <Error error={error} />}

        {finalData && (
          <div className={isGrid ? "grid" : "no-grid"}>
            {finalData.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ProductsList;
