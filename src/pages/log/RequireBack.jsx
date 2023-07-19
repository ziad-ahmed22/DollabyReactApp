import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const RequireBack = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    window.history.back();
  } else {
    return <Outlet />;
  }
};

export default RequireBack;
