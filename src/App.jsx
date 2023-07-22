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
import RequireBack from "./pages/log/RequireBack";

function App() {
  return (
    <>
      <Navbar />
      <Preview />
      <AsideCart />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<Details />} />

        <Route element={<RequireBack />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<Protected />}>
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/cart" element={<Cart />} />
        </Route>

        <Route path="/*" element={<Error msg="Page Not Found" code={404} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
