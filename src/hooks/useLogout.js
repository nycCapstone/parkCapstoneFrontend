import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/userActions/userApiSlice";

const useLogout = () => {
    const navigate = useNavigate()
    const [logout] = useLogoutMutation();

    const startLogout = async () => {
        navigate("/go");
        await logout();
        localStorage.removeItem("persist");
    }

    return startLogout;
}

export default useLogout