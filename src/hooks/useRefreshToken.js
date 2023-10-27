import axios from "../api/axios";
import { setRole } from "../redux/roles/rolesSlice";
import { useDispatch } from "react-redux";
import { setAuth, setCredentials } from "../redux/auth/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    await axios.get("/refresh", {
      withCredentials: true,
    }).then(response => {

      setAuth(response.data);
      dispatch(setRole(response.data));
      localStorage.setItem("persist", true);
      return response.data.accessToken;
    })
  };
  return refresh;
};

export default useRefreshToken;
