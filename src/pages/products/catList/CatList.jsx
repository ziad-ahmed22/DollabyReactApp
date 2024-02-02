import { useGetCatItemsQuery } from "../../../store/apis/productApi";
import Loading from "../../../components/loading/Loading";
import Error from "../../../components/error/Error";
import "./catlist.css";

const CatList = ({ handleAllCatClick, handleCatClick, activeCat }) => {
  const { data, isError, isLoading } = useGetCatItemsQuery();

  return (
    <div className="cat-list d-flex flex-column bg-white mb-4 p-2">
      <div
        className={`w-100 py-2 ${activeCat === 0 ? "active" : ""}`}
        onClick={handleAllCatClick}
      >
        <label htmlFor="all">
          <input id="all" type="radio" name="cat" />
          All
        </label>
      </div>

      {isLoading && <Loading />}

      {isError && <Error msg="Error Loading Items" />}

      {data &&
        data.map((catItem, index) => (
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
