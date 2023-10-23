import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { setRole } from "../redux/roles/rolesSlice";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";

const User = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth, setUserData, userData } = useAuth();
    const dispatch = useDispatch()

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUser = async() => {
            try {
                const response = await axiosPrivate.get('/user/profile', {
                    signal: controller.signal
                });
                dispatch(setRole(response.data));
                delete response.data.roles;
                isMounted && setUserData(response.data);
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
