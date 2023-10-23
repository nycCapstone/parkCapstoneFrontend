import axios from "../api/axios";
import useAuth from "./useAuth";
import { setRole } from "../redux/roles/rolesSlice";
import { useDispatch } from "react-redux";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const dispatch = useDispatch()

  const refresh = async () => {
    const response = await axios.get("/refresh", {
      withCredentials: true,
    });
    dispatch(setRole(response.data));
    setAuth({
      accessToken: response.data.accessToken,
      email: response.data.email,
      id: response.data.id,
    });
    localStorage.setItem("persist", true);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
