import { Outlet } from "react-router-dom";
import { useMyStore } from "../../hooks/useMyStore";

const RequireBack = () => {
  const { auth } = useMyStore();

  if (auth.isAuthenticated) {
    window.history.back();
  } else {
    return <Outlet />;
  }
};

export default RequireBack;
