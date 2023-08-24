import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import "./navbar.css";
import { useDispatch } from "react-redux";
import { openCart } from "../../store/slices/cartSlice";
import profileImage from "./profile.jpg";
import profileAvatar from "./profileAcatar.jpg";
import { useState } from "react";
import { logOut } from "../../store/slices/auth";
import { toast } from "react-toastify";
import { useMyStore } from "../../hooks/useMyStore";

const NavbarC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname: url } = useLocation();
  const { auth, fav, cart } = useMyStore();
  const { data: userData, isAuthenticated } = auth;
  const { data: favData } = fav;
  const [logBox, setLogBox] = useState(false);

  const loginHandler = () => {
    navigate("/login");
    setLogBox(false);
  };

  const logoutHandler = () => {
    dispatch(logOut());
    navigate("/login");
    setLogBox(false);
  };

  return (
    <>
      <Navbar bg="white" expand="md" className="sticky-top shadow">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="text-blue fw-bold fs-3 text-uppercase"
          >
            Dollapy
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto my-2 my-md-0 fw-bold gap-3 align-items-center text-center">
              <Nav.Link
                as={Link}
                to="/"
                className={url === "/" ? "active" : ""}
              >
                Home
              </Nav.Link>

              <Nav.Link
                as={Link}
                to="/products"
                className={url === "/products" ? "active" : ""}
              >
                Shop
              </Nav.Link>

              {!isAuthenticated && (
                <Nav.Link
                  as={Link}
                  to="/login"
                  className={url === "/login" ? "active" : ""}
                >
                  Login
                </Nav.Link>
              )}

              <Nav.Link
                as={Link}
                to="/favourites"
                className={`position-relative fs-5 ${
                  url === "/favourites" ? "active" : ""
                }`}
                onClick={() => {
                  !isAuthenticated && toast.info("You Must Login First");
                }}
              >
                <BsFillHeartFill />
                <span className="flex-center rounded-circle bill">
                  {favData.length}
                </span>
              </Nav.Link>

              <Nav.Link
                className={`position-relative fs-5 ${
                  url === "/cart" ? "active" : ""
                }`}
                onClick={() => {
                  dispatch(openCart());
                }}
              >
                <FaShoppingCart />
                <span className="flex-center rounded-circle bill">
                  {cart.cartData.length}
                </span>
              </Nav.Link>

              <Nav.Link className="profile-img">
                <img
                  src={isAuthenticated ? profileAvatar : profileImage}
                  alt="image"
                  onClick={() => setLogBox(!logBox)}
                />
              </Nav.Link>

              {/* Avatar */}
              <div className={`profile-box ${logBox ? "active" : ""}`}>
                {isAuthenticated ? (
                  <>
                    <h6 className="mb-3">Welcome {userData.username}</h6>
                    <Button size="sm" variant="danger" onClick={logoutHandler}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <h6 className="mb-3">Welcome Yasta</h6>
                    <Button
                      size="sm"
                      className="bg-blue"
                      onClick={loginHandler}
                    >
                      Login
                    </Button>
                  </>
                )}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarC;
