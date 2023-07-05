import { BsFillSuitHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toggleFav } from "../../store/slices/FavouriteSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

const Love = (props) => {
  const { product } = props;
  const dispatch = useDispatch();
  const state = useSelector((state) => state.fav);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(state.data.find((item) => item.id === product.id));
  }, [state]);

  const addToFavHandler = () => {
    if (isAuthenticated) {
      dispatch(toggleFav(product));
    } else {
      toast.info("You Must Login First");
      // navigate("/login");
    }
  };

  return (
    <>
      <Tooltip id={product.id} className="bg-blue " />
      <BsFillSuitHeartFill
        onClick={addToFavHandler}
        className={isActive ? "active" : ""}
        data-tooltip-id={product.id}
        data-tooltip-content={
          isActive ? "Remove From Fav List" : "Add To Fav List"
        }
        data-tooltip-place="left"
      />
    </>
  );
};

export default Love;
