import { Link } from "react-router-dom";
import User from '../User';
import { useSelector } from "react-redux";
import { getRoles } from "../../redux/roles/rolesSlice";

const Admin = () => {

    const roles = useSelector(getRoles);
    return (
        <section>
            <h1>Admin Page</h1>
            {JSON.stringify(roles)}
            <br />
            <User />
            <br />
            <div className="flexGrow">
                <Link to="/">Home</Link>
            </div>
        </section>
    )
}

export default Admin
