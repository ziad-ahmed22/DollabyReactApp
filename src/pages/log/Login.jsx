import { useDispatch, useSelector } from "react-redux";
import "./log.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logIn } from "../../store/slices/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((st) => st.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === state.data.username && password === state.data.password) {
      dispatch(logIn());
      navigate("/", { replace: true });
    } else {
      toast.error("wrong username or password", {
        position: "top-center",
      });
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="login">
      <form className="shadow" onSubmit={handleSubmit}>
        <h2 className="text-blue mb-4 text-center fw-bold">Login</h2>
        <fieldset>
          <label htmlFor="username">
            Username<span className="error ms-1 fs-18">*</span>
          </label>
          <input
            id="username"
            type="text"
            placeholder="Write Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <p className="error">Your Username Is Wrong</p> */}
        </fieldset>

        <fieldset>
          <label htmlFor="password">
            Password<span className="error ms-1 fs-18">*</span>
          </label>
          <input
            id="password"
            type="password"
            placeholder="Write Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <p className="error">Your Paswword Is Wrong</p> */}
        </fieldset>

        <div className="no-email">
          Do not Have Email ? <Link to="/signup"> Signup</Link>
        </div>

        <div className="log-btn">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
