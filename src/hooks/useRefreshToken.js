import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth, dispatchRoles, } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        if (response.data.roles.includes(2)) dispatchRoles({ type: "RENTER" });
        else dispatchRoles({ type: "CLIENT_ONLY" });
        setAuth({
                accessToken: response.data.accessToken,
                email: response.data.email
            }
        );
        localStorage.setItem("persist", true)
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;