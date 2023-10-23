import { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { Link, useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import AddressForm from "../Forms/AddressForm";
import { useSelector } from "react-redux";
import { getRoles, setRole, modifyRole } from "../../redux/roles/rolesSlice";

const Client = () => {

    const { userData, setUserData } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [mode, setMode] = useState("");
    const roles = useSelector(getRoles);
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

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
                setRole(response.data);
                delete response.data.roles;
                isMounted && setUserData(response.data);
                modifyRole(response.data);
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
      if (!userData?.client_background_verified && roles.hasOwnProperty("ClientOnly")) { setMode("CLIENT"); setShowForm(true); };
      if (!userData?.is_auth && roles.hasOwnProperty("Renter")) { setMode("RENTER"); setShowForm(true); };
    }
    }, [userData])

    
    return (
        <section>
            <h1>Client Page</h1>
            <br />
            {showForm && (<div>
                <AddressForm mode={mode} userData={userData}/>
                </div>)}
            <p>This is where you can make a booking.</p>
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Client
