import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/userActions/userApiSlice";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth/authSlice";
import { LOGOUT } from "../redux/roles/rolesSlice";
import { resetCheckoutCache } from "../redux/checkout/checkoutSlice";
import { resetSearchState } from "../redux/search/searchResultsSlice";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const startLogout = async () => {
    navigate("/go");
    try {
      await logout()
        .unwrap()
        .then(() => {
          dispatch(logOut());
          dispatch(LOGOUT());
          dispatch(resetSearchState());
          dispatch(resetCheckoutCache());
        });
      localStorage.removeItem("persist");
    } catch (e) {
      console.error(e);
    }
  };

  return startLogout;
};

export default useLogout;
