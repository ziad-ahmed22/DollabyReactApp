import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAll } from "../../store/slices/categoriesSlice";
import Loading from "../../components/loading/Loading";
import Error from "../../components/error/Error";
import { formatPrice } from "../../utils/formatCurrency";
import { Link } from "react-router-dom";
import "./maylike.css";

const MayLike = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.categories);
  const randomNumer = Math.floor(Math.random() * (state.data.length - 5));

  useEffect(() => {
    dispatch(fetchAll());
  }, []);

  if (state.loading) {
    return (
      <div className="bg-white shadow rounded p-2">
        <h5>You May Like</h5>
        <Loading />
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="bg-white shadow rounded p-2">
        <h5>You May Like</h5>
        <Error msg={state.error} />
      </div>
    );
  }

  return (
    <div className="may-like bg-white shadow rounded px-2 py-3">
      <h5 className="mb-3">You May Like</h5>

      {state.data.slice(randomNumer, randomNumer + 4).map((product) => (
        <Link to={`/products/${product.id}`} key={product.id}>
          <div className="box flex-between rounded mt-2">
            <div className="img">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-100 h-100"
              />
            </div>

            <div className="info p-2">
              <h6 className="fs-14 mb-3">
                {product.title.length > 15
                  ? product.title.slice(0, 15) + "..."
                  : product.title}
              </h6>

              <div className="flex-between">
                <span className="fs-14 text-blue">
                  {formatPrice(product.priceAfterDiscount)}
                </span>
                <span className="fs-14 text-danger text-decoration-line-through">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

function shouldComponentUpdate(prevData, nextData) {
  return prevData.data === nextData.data;
}

export default React.memo(MayLike, shouldComponentUpdate);
