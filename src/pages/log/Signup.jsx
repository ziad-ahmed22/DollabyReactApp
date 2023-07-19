import { Link, useNavigate } from "react-router-dom";
import "./log.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/slices/auth";
import { toast } from "react-toastify";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    password: "",
    passwordr: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setShow(true);
    if (
      userData.name.length >= 8 &&
      userData.password.length >= 8 &&
      userData.password === userData.passwordr
    ) {
      dispatch(signUp(userData));
      navigate("/login");
      toast.success("Registered Successfully", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="signup">
      <form className="shadow" onSubmit={handleSubmit}>
        <h2 className="text-blue mb-4 text-center fw-bold">Signup</h2>
        <fieldset>
          <label htmlFor="username">
            Username<span className="error ms-1 fs-18">*</span>
          </label>
          <input
            id="username"
            type="text"
            placeholder="Write Your Username"
            value={userData.username}
            required
            onChange={(e) =>
              setUserData({
                ...userData,
                username: e.target.value,
              })
            }
          />
        </fieldset>

        <fieldset>
          <label htmlFor="name">
            Full Name<span className="error ms-1 fs-18">*</span>
          </label>
          <input
            id="name"
            type="text"
            placeholder="Write Your Name"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          {userData.name.length < 8 && show && (
            <p className="error">Name must be at least 8 characters</p>
          )}
        </fieldset>

        <fieldset>
          <label htmlFor="password">
            Password<span className="error ms-1 fs-18">*</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Write Your Password"
            value={userData.password}
            onChange={(e) =>
              setUserData({
                ...userData,
                password: e.target.value,
              })
            }
          />
          {userData.password.length < 8 && show && (
            <p className="error">Name must be at least 8 characters</p>
          )}
        </fieldset>

        <fieldset>
          <label htmlFor="passwordr">
            Repeate Password<span className="error ms-1 fs-18">*</span>
          </label>
          <input
            id="passwordr"
            type="password"
            placeholder="Write Your Password Again"
            value={userData.passwordr}
            onChange={(e) =>
              setUserData({
                ...userData,
                passwordr: e.target.value,
              })
            }
          />
          {userData.password !== userData.passwordr && show && (
            <p className="error">Passowrd Does not Matches!</p>
          )}
        </fieldset>

        <div className="have-email">
          Have Email ? <Link to="/login"> Login</Link>
        </div>

        <div className="log-btn">
          <button type="submit">Signup</button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
