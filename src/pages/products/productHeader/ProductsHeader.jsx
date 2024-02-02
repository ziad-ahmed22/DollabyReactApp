import { BsJustify, BsFillGrid3X3GapFill } from "react-icons/bs";
import "./productsheader.css";

const ProductsHeader = ({
  isGrid,
  handleGrid,
  priceHighToLow,
  priceLowToHigh,
}) => {
  const handleArrange = (e) => {
    e.target.value === "htl"
      ? priceHighToLow()
      : e.target.value === "lth"
      ? priceLowToHigh()
      : null;
  };

  return (
    <div className="product-head bg-white mb-4 p-3 shadow">
      <div className="flex-between">
        <div>
          <BsFillGrid3X3GapFill
            onClick={() => handleGrid(true)}
            className={isGrid ? "active" : ""}
          />
          <BsJustify
            onClick={() => handleGrid(false)}
            className={!isGrid ? "active" : ""}
          />
        </div>

        <div>
          <select defaultValue={"DEFAULT"} onChange={handleArrange}>
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
