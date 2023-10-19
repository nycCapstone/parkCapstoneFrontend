import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const User = () => {
    const [user, setUser] = useState({});
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUser = async () => {
            try {
                const response = await axiosPrivate.get('/user/profile', {
                    signal: controller.signal
                });
                isMounted && setUser(response.data);
                setAuth(prev => ({...prev, roles: response.data.roles }))
            } catch (err) {
                console.error(err);
                navigate('/login', { state: { from: location }, replace: true });
            }
        }

        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    return (
        <article>
            <h2>Table data List</h2>
            {Object.values(user)?.length
                ? (
                    <ul>
                        {Object.values(user).map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                ) : <p>No content to display</p>
            }
        </article>
    );
};

export default User;
