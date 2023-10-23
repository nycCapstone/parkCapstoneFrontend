import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {LOGOUT} from '../redux/roles/rolesSlice';

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
            navigate("/linkpage")
            dispatch(LOGOUT())
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout