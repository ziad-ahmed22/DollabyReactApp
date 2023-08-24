import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useMyStore } from "../../hooks/useMyStore";

const Protected = () => {
  const { auth } = useMyStore();
  const location = useLocation();

  if (auth.isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default Protected;
