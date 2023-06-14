import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsFillHeartFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { openCart } from "../../store/slices/cartSlice";
import profileImage from "./profile.jpg";
import profileAvatar from "./profileAcatar.jpg";
import { useState } from "react";
import { logOut } from "../../store/slices/auth";
import { toast } from "react-toastify";

const NavbarC = () => {
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);
  const { data: favData } = useSelector((state) => state.fav);
  const { data: userData, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const loginHandler = () => {
    navigate("/login");
    setIsActive(false);
  };
  const logoutHandler = () => {
    dispatch(logOut());
    navigate("/login");
    setIsActive(false);
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
              <Nav.Link as={NavLink} to="/">
                Home
              </Nav.Link>

              <Nav.Link as={NavLink} to="/products">
                Shop
              </Nav.Link>

              {!isAuthenticated && (
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
              )}

              <Nav.Link
                className="position-relative fs-5"
                as={NavLink}
                to="/favourites"
                onClick={() =>
                  !isAuthenticated && toast.info("You Must Login First")
                }
              >
                <BsFillHeartFill />
                <span className="flex-center rounded-circle bill">
                  {favData.length}
                </span>
              </Nav.Link>

              <Nav.Link
                className="position-relative fs-5"
                // as={NavLink}
                // to="/cart"
                onClick={() => dispatch(openCart())}
              >
                <FaShoppingCart />
                <span className="flex-center rounded-circle bill">
                  {cartData.length}
                </span>
              </Nav.Link>

              <Nav.Link className="profile-img">
                <img
                  src={isAuthenticated ? profileAvatar : profileImage}
                  alt="image"
                  onClick={() => setIsActive(!isActive)}
                />
              </Nav.Link>

              <div className={`profile-box ${isActive ? "active" : ""}`}>
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
