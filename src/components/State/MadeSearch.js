import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const MadeSearch = () => {
    const searchState = useSelector(state => state.searchResults);
    const CLsearchState = useSelector(state => state.client.go);
    const location = useLocation();

    if (searchState.data?.results?.length>0 || CLsearchState) {
        return <Outlet />;
    } else {
        return <Navigate to="/go" state={{ from: location }} replace />;
    }
}

export default MadeSearch;