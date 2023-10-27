import { Link, useNavigate } from "react-router-dom";
import User from "../User";
import { useGetInfoQuery, useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useEffect } from "react";


const Admin = () => {
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, error } = useGetUserInfoQuery();
  
  useEffect(() => {
      if (error) {
          console.error('Error:', error);
          navigate("/linkpage")
        }
  }, [data])

  return isLoading ? (
    <section>
      <p>Loading...</p>
      <div className="flexGrow">
        <Link to="/home">Home</Link>
      </div>
    </section>
  ) : isSuccess ? (
    <section>
      <h1>Admin Page</h1>
      {JSON.stringify(data)}
      <User userData={() => {delete data['roles']; return data;}} />
      <div className="flexGrow">
        <Link to="/home">Home</Link>
      </div>
    </section>
  ) :  <p>{JSON.stringify(error)}</p> ;
};

export default Admin;
