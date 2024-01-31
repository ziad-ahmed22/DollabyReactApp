import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { scrollToTop } from "../../utils/scrollToTop";
import { Input } from "../../components/input/Input";
import { logIn } from "../../store/slices/auth";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const to = location.state?.from?.pathname || "/";
  const state = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = userData;

    if (username === state.data.username && password === state.data.password) {
      dispatch(logIn());
      navigate(to, { replace: true });
    } else {
      toast.error("wrong username or password", {
        position: "top-center",
      });
    }
  };

  useEffect(() => scrollToTop(), []);

  return (
    <div className="login flex-center">
      <form className="shadow" onSubmit={handleSubmit}>
        <h2 className="text-blue mb-4 text-center fw-bold">Login</h2>

        <Input
          id="username"
          type="text"
          label="Username"
          placeholder="Write Your Username"
          value={userData.username}
          onChange={handleChange}
        />

        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Write Your Password"
          value={userData.password}
          onChange={handleChange}
        />

        <div className="form-footer">
          <div className="no-email">
            Do not Have Email ? <Link to="/signup"> Signup</Link>
          </div>

          <div className="log-btn">
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
