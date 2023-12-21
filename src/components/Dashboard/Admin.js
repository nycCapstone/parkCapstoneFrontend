import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import AdminPage from "../AdminPage/AdminPage";
import "./Styles/Admin.css";

const Admin = () => {
  const { data, isLoading, isError, isSuccess, error, refetch } =
    useGetUserInfoQuery();

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
        <h1 className="welcome-heading">
          Welcome,{" "}
          {data?.first_name && (
            <span className="profile-welcome-first-name">
              {data?.first_name[0].toUpperCase() +
                data.first_name.slice(1).toLowerCase()}
            </span>
          )}
        </h1>
        <AdminPage />
        <section className="home-container">
          <div className="link-container">
            <Link to="/client" className="nav-link">
              Go to the Client page
            </Link>
            {data?.roles?.Renter && (
              <Link to="/renter" className="nav-link">
                Go to the Renter
              </Link>
            )}
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
    return <div>Api Down</div>;
  }
};

export default Admin;
