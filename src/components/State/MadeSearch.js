import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const MadeSearch = () => {
    const searchState = useSelector(state => state.searchResults);
    const location = useLocation();

    if (searchState.data?.results?.length>0) {
        return <Outlet />;
    } else {
        return <Navigate to="/go" state={{ from: location }} replace />;
    }
}

export default MadeSearch;