import axios from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        setAuth(prev => ({
                ...prev,
                accessToken: response.data.accessToken,
                email: response.data.email,
                roles: response.data.roles
            }
        )
        );
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;