import axios from "../api/axios";
import { setRole } from "../redux/roles/rolesSlice";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/auth/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    await axios.get("/refresh", {
      withCredentials: true,
    }).then(response => {
      
    dispatch(setRole(response.data));
    dispatch(setAuth(response.data));
    })
  };
  return refresh;
};

export default useRefreshToken;
