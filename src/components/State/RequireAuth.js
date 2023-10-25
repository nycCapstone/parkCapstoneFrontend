import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRoles } from "../../redux/roles/rolesSlice";
import { selectCurrentToken } from "../../redux/auth/authSlice";

const RequireAuth = ({ allowedRoles }) => {
    const token = useSelector(selectCurrentToken);
    const location = useLocation();
    const roles = useSelector(getRoles)

    return (
        Object.keys(roles).find(role => allowedRoles.includes(role))
            ? <Outlet />
            : token
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;