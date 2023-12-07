import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import AdminPage from "../AdminPage/AdminPage";
import "./Styles/Admin.css";

const Admin = () => {

  const { data, isLoading, isError, isSuccess, error, refetch } = useGetUserInfoQuery();

  const logout = useLogout();

  const signOut = async () => {
    await logout();
  };

  if (isLoading) {
    return <div>Loading user information...</div>;
  }

  if (isError) {
    return (
      <div>
        <h3>Error fetching user information</h3>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }
  
  if (isSuccess) {
    return (
      <div className="admin-all-container">
        <AdminPage />
        <section className="home-container">
          <h1 className="welcome-heading">Welcome Home</h1>
          {data?.email && <p className="user-email">Email: {data?.email}</p>}

          <div className="link-container">
            <Link to="/client" className="nav-link">
              Go to the Client page
            </Link>
            <Link to="/renter" className="nav-link">
              Go to the Renter
            </Link>
            <Link to="/go" className="nav-link">
              home page
            </Link>
          </div>

          <div className="flexGrow">
            <button className="sign-out-button" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return <div>Api Down</div>
  }

};

export default Admin;
