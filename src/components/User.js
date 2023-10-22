import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const User = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth, setUserData, userData, dispatchRoles } = useAuth();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUser = async() => {
            try {
                const response = await axiosPrivate.get('/user/profile', {
                    signal: controller.signal
                });
                if (response.data.roles.includes(2)) dispatchRoles({ type: "RENTER" });
                else dispatchRoles({ type: "CLIENT_ONLY" });
                delete response.data.roles;
                isMounted && setUserData(response.data)
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
            {Object.values(userData)?.length
                ? (
                    <ul>
                        {Object.values(userData).map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                ) : <p>No content to display</p>
            }
        </article>
    );
};

export default User;
