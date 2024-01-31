import { useEffect } from "react";

import { scrollToTop } from "../../utils/scrollToTop";
import AllProducts from "./allProducts/AllProducts";
import MainSlider from "./mainSlider/MainSlider";

const Home = () => {
  useEffect(() => scrollToTop(), []);

  return (
    <div className="home">
      <MainSlider />
      <AllProducts />
    </div>
  );
};

export default Home;
