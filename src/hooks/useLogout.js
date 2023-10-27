import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {LOGOUT} from '../redux/roles/rolesSlice';
import { noActions } from "../redux/userActions/userActionSlice";
import { logOut } from "../redux/auth/authSlice";
import { resetForm } from "../redux/forms/formsSlice";

const useLogout = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = async () => {
        navigate("/go")
        localStorage.removeItem("persist")
            await axios('/logout', {
                withCredentials: true
            }).then(res => {

                dispatch(logOut());
                dispatch(LOGOUT());
                dispatch(noActions());
                dispatch(resetForm());

            }).catch(e => console.error(e))
    }

    return logout;
}

export default useLogout