import { useEffect, useState } from "react";
import "./catlist.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchCatItems } from "./../../store/slices/catItemsSlice";
import { fetchAll, fetchCategories } from "../../store/slices/categoriesSlice";

const CatList = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.catItems);
  const [activeCat, setActiveCat] = useState(0);

  useEffect(() => {
    dispatch(fetchCatItems());
  }, []);

  const handleAllClick = () => {
    dispatch(fetchAll());
    setActiveCat(0);
  };

  const handleCatClick = (e, index) => {
    dispatch(fetchCategories(e.currentTarget.dataset.val));
    setActiveCat(index + 1);
  };

  return (
    <div className="cat-list d-flex flex-column bg-white mb-4 p-2">
      <div
        className={activeCat === 0 ? "active w-100 py-2" : "w-100 py-2"}
        onClick={handleAllClick}
      >
        <label htmlFor="all">
          <input id="all" type="radio" name="cat" />
          All
        </label>
      </div>

      {state.data.map((catItem, index) => (
        <div
          className={
            activeCat === index + 1 ? "active w-100 py-2" : "w-100 py-2"
          }
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
