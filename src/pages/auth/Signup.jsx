import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useState } from "react";

import { Input } from "../../components/input/Input";
import { signUp } from "../../store/slices/auth";
import "./auth.css";

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

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.id]: e.target.value,
    });
  };

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
    <div className="signup flex-center">
      <form className="shadow" onSubmit={handleSubmit}>
        <h2 className="text-blue mb-4 text-center fw-bold">Signup</h2>

        <Input
          id="username"
          type="text"
          label="Username"
          placeholder="Write Your Username"
          value={userData.username}
          onChange={handleChange}
          required
          hasError={userData.username.length < 1 && show}
          errorMsg="Username is required"
        />

        <Input
          id="name"
          type="text"
          label="Full Name"
          placeholder="Write Your Name"
          value={userData.name}
          onChange={handleChange}
          required
          hasError={userData.name.length < 8 && show}
          errorMsg="Name must be at least 8 characters"
        />

        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Write Your Password"
          value={userData.password}
          onChange={handleChange}
          required
          hasError={userData.password.length < 8 && show}
          errorMsg="Name must be at least 8 characters"
        />

        <Input
          id="passwordr"
          type="password"
          label="Repeate Password"
          placeholder="Write Your Password Again"
          value={userData.passwordr}
          onChange={handleChange}
          required
          hasError={userData.password !== userData.passwordr && show}
          errorMsg="Passowrd Does not Matches!"
        />

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
