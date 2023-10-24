import { Link } from "react-router-dom";
import User from '../User';
import { getRoles } from "../../redux/roles/rolesSlice";
import { getFormData } from "../../redux/forms/formsSlice";
import { useSelector } from "react-redux";

const Admin = () => {

    const roles = useSelector(getRoles);
    const formData = useSelector(getFormData);
    return (
        <section>
            <h1>Admin Page</h1>
            {JSON.stringify(roles)}
            {JSON.stringify(formData)}
            <br />
            <User />
            <br />
            <div className="flexGrow">
                <Link to="/home">Home</Link>
            </div>
        </section>
    )
}

export default Admin
