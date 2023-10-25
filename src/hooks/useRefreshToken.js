import axios from "../api/axios";
import { setRole } from "../redux/roles/rolesSlice";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/auth/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    dispatch(setRole(response.data));
    dispatch(setAuth(response.data))
    localStorage.setItem("persist", true);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
