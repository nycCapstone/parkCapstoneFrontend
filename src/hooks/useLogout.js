import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/userActions/userApiSlice";
import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth/authSlice";
import { LOGOUT } from "../redux/roles/rolesSlice";

const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logout] = useLogoutMutation();

  const startLogout = async () => {
    try {
      await logout()
        .unwrap()
        .then((res) => {
          dispatch(logOut());
          dispatch(LOGOUT());
        });
      localStorage.removeItem("persist");
    } catch (e) {
      console.error(e);
    } finally {
      navigate("/go");
    }
  };

  return startLogout;
};

export default useLogout;
