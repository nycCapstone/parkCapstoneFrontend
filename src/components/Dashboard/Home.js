import { Link, useNavigate } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { useSelector } from "react-redux"
import { useLogoutQuery } from "../../redux/userActions/userApiSlice";

const Home = () => {
    const { email } = useSelector(state => state.auth);
    const logout = useLogout();

    const signOut = async () => {
        await logout();
    }

    return (
        <section>
            <h1>Home</h1>
            <br />
            { email ? <p>{email}</p> : <p>Welcome Stranger</p>}
            
            <br />
            <Link to="/client">Go to the Client page</Link>
            <br />
            <Link to="/renter">Go to the Renter</Link>
            <br />
            <Link to="/admin">Go to the Admin page</Link>
            <br />
            <Link to="/go">Go to the link page</Link>
            <div className="flexGrow">
                <button onClick={signOut}>Sign Out</button>
            </div>
        </section>
    )
}

export default Home
