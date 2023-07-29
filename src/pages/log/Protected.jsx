import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const Protected = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const location = useLocation();

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default Protected;
