import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/userActions/userApiSlice";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth/authSlice";
import { LOGOUT } from "../redux/roles/rolesSlice";
import { resetRInfoCache } from "../redux/checkout/reservationSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const startLogout = async () => {
    try {
      await logout()
        .unwrap()
        .then(() => {
          dispatch(logOut());
          dispatch(LOGOUT());
          dispatch(resetRInfoCache());
        });
      localStorage.removeItem("persist");
    } catch (e) {
      console.error(e);
    }
  };

  return startLogout;
};

export default useLogout;
