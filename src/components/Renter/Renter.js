import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import AddressForm from "../Forms/AddressForm";
import { useSelector, useDispatch } from "react-redux";
import { getRoles, setRole } from "../../redux/roles/rolesSlice";

const Renter = () => {

    const { userData, setUserData } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [mode, setMode] = useState("");
    const roles = useSelector(getRoles);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
            if (!localStorage.getItem("persist")) {
                navigate("/");
            }
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
            }
        }

        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [])

    useEffect(() => {
    if (userData?.hasOwnProperty("id")) {
      if (!userData?.background_verified && roles.hasOwnProperty("Renter")) { setMode("RENTER"); setShowForm(true); };
    }
    }, [userData])

    
    return (
        <section>
            <h1>Renter Page</h1>
            <br />
            {showForm && (<div>
                <AddressForm mode={mode} userData={userData}/>
                </div>)}
            <p>This is where you can make new available spots.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Renter