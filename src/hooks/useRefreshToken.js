import axios from "../api/axios";
import { setRole } from "../redux/roles/rolesSlice";
import { useDispatch } from "react-redux";
import { setAuth } from "../redux/auth/authSlice";
import { formValue } from "../redux/forms/formsSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    await axios.get("/refresh", {
      withCredentials: true,
    }).then(response => {
      
    dispatch(setRole(response.data));
    dispatch(setAuth(response.data));
    dispatch(formValue(response.data, response.data.roles, true))
    })
  };
  return refresh;
};

export default useRefreshToken;
