import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";

import { fetchAllProducts } from "../../../store/slices/allProductSlice";
import MayLikeCard from "../../../components/mayLikeCard/MayLikeCard";
import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";

const MayLike = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.allProducts);
  const randomNumer = Math.floor(Math.random() * (allProducts.data.length - 5));

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  return (
    <div className="may-like bg-white shadow rounded px-2 py-3">
      <h5 className="mb-3">You May Like</h5>

      {allProducts.loading && <Loading />}

      {allProducts.error && <Error msg={allProducts.error} />}

      {allProducts.data.slice(randomNumer, randomNumer + 4).map((product) => (
        <MayLikeCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default React.memo(MayLike);
