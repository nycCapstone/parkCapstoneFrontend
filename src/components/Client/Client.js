import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from '../../hooks/useAuth';
import AddressForm from "../Forms/AddressForm";

const Client = () => {

    const { roles, userData } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [mode, setMode] = useState("");

    useEffect(() => {
      if (!userData?.is_auth && roles.hasOwnProperty("ClientOnly")) { setMode("CLIENT"); setShowForm(true); };
      if (!userData?.is_auth && roles.hasOwnProperty("Renter")) { setMode("RENTER"); setShowForm(true); };
    }, [])
    
    return (
        <section>
            <h1>Client Page</h1>
            <br />
            {showForm && (<div>
                <h3>confirm your address</h3>
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
