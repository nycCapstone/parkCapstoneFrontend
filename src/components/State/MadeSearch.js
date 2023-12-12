import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const MadeSearch = () => {
  const searchState = useSelector((state) => state.searchResults);
  const CLsearchState = useSelector((state) => state.client.go?.length);
  const location = useLocation();

  if (typeof searchState?.location?.lat === "number" || CLsearchState) {
    return <Outlet />;
  } else {
    return <Navigate to="/go" state={{ from: location }} replace />;
  }
};

export default MadeSearch;
