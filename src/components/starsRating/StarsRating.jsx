import { BsStarFill } from "react-icons/bs";

const StarsRating = ({ rating }) => {
  const starsArr = [];

  for (let i = 0; i < rating; i++) {
    starsArr.push(<BsStarFill key={i} className="mx-1" />);
  }

  return <div className="stars">{starsArr}</div>;
};

export default StarsRating;
