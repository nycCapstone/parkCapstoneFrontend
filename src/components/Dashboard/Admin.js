import { Link } from "react-router-dom";
import User from "../User";


const Admin = () => {

    return <section>
      <h1>Admin Page</h1>
        <User/>
      <div className="flexGrow">
        <Link to="/home">Home</Link>
      </div>
    </section>
};

export default Admin;
