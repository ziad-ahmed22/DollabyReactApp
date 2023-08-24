import { BsFillSuitHeartFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { toggleFav } from "../../store/slices/FavouriteSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";
import { useMyStore } from "../../hooks/useMyStore";

const Love = ({ product }) => {
  const dispatch = useDispatch();
  const { auth, fav } = useMyStore();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(fav.data.find((item) => item.id === product.id));
  }, [fav]);

  const favHandler = () => {
    if (auth.isAuthenticated) {
      dispatch(toggleFav(product));
    } else {
      toast.info("You Must Login First");
    }
  };

  return (
    <>
      <Tooltip id={product.id} className="bg-blue " />
      <BsFillSuitHeartFill
        onClick={favHandler}
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
