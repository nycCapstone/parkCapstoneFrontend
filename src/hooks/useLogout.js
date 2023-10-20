import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const { setAuth, dispatchRoles } = useAuth();
    const navigate = useNavigate()

    const logout = async () => {
        setAuth({});
        localStorage.removeItem("persist")
        try {
            await axios('/logout', {
                withCredentials: true
            });
            navigate("/linkpage")
            dispatchRoles({ type: "LOGOUT" })
        } catch (err) {
            console.error(err);
        }
    }

    return logout;
}

export default useLogout