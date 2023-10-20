import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import useAuth from "../hooks/useAuth";

const Home = () => {
    const { auth } = useAuth();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            { auth?.email ? <p>{auth.email}</p> : <p>Welcome Stranger</p>}
            
            <br />
            <Link to="/client">Go to the Client page</Link>
            <br />
            <Link to="/renter">Go to the Renter</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/linkpage">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home
