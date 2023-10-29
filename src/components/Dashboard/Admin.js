import { Link } from "react-router-dom";
import User from "../User";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRetweet } from "@fortawesome/free-solid-svg-icons"

const Admin = () => {
    const { refetch } = useGetUserInfoQuery();

    return <section>
      <h1>Admin Page</h1>
      <FontAwesomeIcon onClick={()=> refetch()} icon={faRetweet} style={{cursor: 'pointer'}}/>
        <User/>
      <div className="flexGrow">
        <Link to="/home">Home</Link>
      </div>
    </section>
};

export default Admin;
