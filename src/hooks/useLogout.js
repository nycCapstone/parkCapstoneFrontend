import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {LOGOUT} from '../redux/roles/rolesSlice';
import { noActions } from "../redux/userActions/userActionSlice";

const useLogout = () => {
    const { setAuth } = useAuth();
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = async () => {
        setAuth({});
        localStorage.removeItem("persist")
        try {
            await axios('/logout', {
                withCredentials: true
            });
            dispatch(LOGOUT());
            dispatch(noActions())
            navigate("/linkpage")
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout