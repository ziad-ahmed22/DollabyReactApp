import { Route, Routes } from "react-router-dom";

import { RootLayout } from "./components/rootLayout/RootLayout";
import RequireBack from "./components/requireBack/RequireBack";
import RequireAuth from "./components/requireAuth/requireAuth";
import Error from "./components/error/Error";

import Favourites from "./pages/favourite/Favourites";
import Products from "./pages/products/Products";
import Details from "./pages/details/Details";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";

function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Details />} />

          <Route element={<RequireBack />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/cart" element={<Cart />} />
          </Route>

          <Route
            path="/*"
            element={<Error msg="Page Not Found" code={404} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
