import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Details from "./pages/details/Details";
import Favourites from "./pages/favourite/Favourites";
import Cart from "./pages/cart/Cart";
import Login from "./pages/log/Login";
import Signup from "./pages/log/Signup";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Preview from "./components/preview/Preview";
import Protected from "./pages/log/Protected";
import { ToastContainer } from "react-toastify";
import Error from "./components/error/Error";
import AsideCart from "./components/aside/AsideCart";

function App() {
  return (
    <>
      <Navbar />
      <Preview />
      <AsideCart />
      <ToastContainer />
      <Routes>
        <Route path="/DollabyReactApp" element={<Home />} />
        <Route path="/DollabyReactApp/products" element={<Products />} />
        <Route path="/DollabyReactApp/products/:id" element={<Details />} />
        <Route path="/DollabyReactApp/login" element={<Login />} />
        <Route path="/DollabyReactApp/signup" element={<Signup />} />
        <Route
          path="/DollabyReactApp/favourites"
          element={
            <Protected>
              <Favourites />
            </Protected>
          }
        />
        <Route
          path="/DollabyReactApp/cart"
          element={
            <Protected>
              <Cart />
            </Protected>
          }
        />
        <Route
          path="/DollabyReactApp/*"
          element={<Error msg="Page Not Found" code={404} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
