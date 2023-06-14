import { BiMenu } from "react-icons/bi";
import { CgMenuGridO } from "react-icons/cg";
import "./productsheader.css";
import { useDispatch } from "react-redux";
import {
  priceHighToLow,
  priceLowToHigh,
} from "../../store/slices/categoriesSlice";

const ProductsHeader = ({ gridThree, handleGrid }) => {
  const dispatch = useDispatch();

  const handlePriceChange = (e) => {
    e.target.value === "htl"
      ? dispatch(priceHighToLow())
      : e.target.value === "lth"
      ? dispatch(priceLowToHigh())
      : null;
  };

  return (
    <div className="product-head bg-white mb-4 p-3 shadow">
      <div className="flex-between">
        <div>
          <CgMenuGridO
            onClick={() => handleGrid(true)}
            className={gridThree ? "active" : ""}
          />
          <BiMenu
            onClick={() => handleGrid(false)}
            className={!gridThree ? "active" : ""}
          />
        </div>
        <div>
          <select defaultValue={"DEFAULT"} onChange={handlePriceChange}>
            <option value="DEFAULT" disabled>
              Arrange By Price
            </option>
            <option value="lth">Price From Low To High</option>
            <option value="htl">Price From High To Low</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;
