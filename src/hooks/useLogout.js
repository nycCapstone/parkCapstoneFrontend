import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {LOGOUT} from '../redux/roles/rolesSlice';
import { noActions } from "../redux/userActions/userActionSlice";
import { logOut } from "../redux/auth/authSlice";

const useLogout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = async () => {
        localStorage.removeItem("persist")
        try {
            await axios('/logout', {
                withCredentials: true
            });
            dispatch(logOut())
            dispatch(LOGOUT());
            dispatch(noActions())
            navigate("/go")
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout