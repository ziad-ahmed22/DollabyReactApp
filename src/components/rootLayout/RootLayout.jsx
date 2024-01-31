import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

import Aside from "../aside/Aside";
import Preview from "../preview/Preview";
import NavbarC from "../navbar/Navbar";
import Footer from "../footer/Footer";

export const RootLayout = () => {
  return (
    <>
      <NavbarC />
      <Preview />
      <Aside />
      <ToastContainer />
      <Outlet />
      <Footer />
    </>
  );
};
