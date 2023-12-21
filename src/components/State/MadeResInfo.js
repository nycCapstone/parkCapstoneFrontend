import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const MadeResInfo = () => {
  const resInfo = useSelector((state) => state.reservation);
  const location = useLocation();

  if (resInfo.hasOwnProperty("selected_space")) {
    return <Outlet />;
  } else {
    const originalLocation = location.state?.from || "/";
    return <Navigate to={originalLocation} replace />;
  }
};

export default MadeResInfo;
