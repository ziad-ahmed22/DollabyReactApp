import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  fetchAllCategories,
  fetchCategories,
} from "../../../store/slices/categoriesSlice";
import { fetchCatItems } from "../../../store/slices/catItemsSlice";
import Loading from "../../../components/loading/Loading";
import { useMyStore } from "../../../hooks/useMyStore";
import Error from "../../../components/error/Error";
import "./catlist.css";

const CatList = () => {
  const dispatch = useDispatch();
  const { catItems } = useMyStore();
  const [activeCat, setActiveCat] = useState(0);

  useEffect(() => {
    dispatch(fetchCatItems());
  }, [dispatch]);

  const handleAllClick = () => {
    dispatch(fetchAllCategories());
    setActiveCat(0);
  };

  const handleCatClick = (e, index) => {
    dispatch(fetchCategories(e.currentTarget.dataset.val));
    setActiveCat(index + 1);
  };

  return (
    <div className="cat-list d-flex flex-column bg-white mb-4 p-2">
      <div
        className={`w-100 py-2 ${activeCat === 0 ? "active" : ""}`}
        onClick={handleAllClick}
      >
        <label htmlFor="all">
          <input id="all" type="radio" name="cat" />
          All
        </label>
      </div>

      {catItems.loading && <Loading />}

      {catItems.error && <Error msg="Error Loading Items" />}

      {catItems.data.map((catItem, index) => (
        <div
          className={` w-100 py-2 ${activeCat === index + 1 ? "active" : ""}`}
          key={index}
          data-val={catItem}
          onClick={(e) => handleCatClick(e, index)}
        >
          <label htmlFor={catItem}>
            <input id={catItem} type="radio" name="cat" />
            {catItem}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CatList;
