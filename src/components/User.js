import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { setRole, getRoles } from "../redux/roles/rolesSlice";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import { formValue } from "../redux/forms/formsSlice";
import { getAction, confirmAddress } from "../redux/userActions/userActionSlice";

const User = () => {
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const location = useLocation();
    const { setAuth, setUserData, userData } = useAuth();
    const dispatch = useDispatch()
    const userActions = useSelector(getAction);
    const roles = useSelector(getRoles)


    useEffect(() => {
        let isMounted = true;
        var err = false;
        const controller = new AbortController();

        const getUser = async() => {
            try {
                const response = await axiosPrivate.get('/user/profile', {
                    signal: controller.signal
                });
                dispatch(setRole(response.data));
                delete response.data.roles;
                isMounted && setUserData(response.data);
            } catch (e) {
                console.error(e);
                err = true
                navigate('/login', { state: { from: location }, replace: true });
            } finally {
                dispatch(confirmAddress(roles));
                dispatch(formValue(userData, roles, err));
            }
        }

        getUser();
        console.log(userActions);

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
                        <ul>

{
    userActions?.length>0 && (
        userActions.map((item, idx) =>{ return userActions.length > 1 && idx>0 ? <li key={idx}>{item}</li> : <li key={idx} style={{ color: 'green'}} onClick={() => navigate('confirm-details')}>{item}</li>}
        )
    )
}
</ul>
        </article>
    );
};

export default User;
