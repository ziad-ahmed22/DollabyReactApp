import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/DollabyReactApp/login" />;
  }
};

export default Protected;
