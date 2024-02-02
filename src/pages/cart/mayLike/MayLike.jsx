import React from "react";
import { useGetAllProductsQuery } from "../../../store/apis/productApi";
import MayLikeCard from "../../../components/mayLikeCard/MayLikeCard";
import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";

const MayLike = () => {
  const { data, isError, error, isLoading } = useGetAllProductsQuery();
  const randomNumer =
    data !== undefined && Math.floor(Math.random() * (data.length - 5));

  return (
    <div className="may-like bg-white shadow rounded px-2 py-3">
      <h5 className="mb-3">You May Like</h5>

      {isLoading && <Loading />}

      {isError && <Error error={error} />}

      {data !== undefined &&
        data
          .slice(randomNumer, randomNumer + 4)
          .map((product) => <MayLikeCard key={product.id} product={product} />)}
    </div>
  );
};

export default React.memo(MayLike);
