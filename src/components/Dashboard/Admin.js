import { Link } from "react-router-dom";
import React from "react";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import useLogout from "../../hooks/useLogout";
import AdminPage from "../AdminPage/AdminPage";
import "./Styles/Admin.css";

const Admin = () => {
  const { data, refetch, isLoading, isError, isSuccess } =
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
      <section>
        <AdminPage userInfo={data} />
        <div className="flexGrow">
          {/* <Link to="/home" className="home-link">
            Home
          </Link> */}
        </div>
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
            <Link to="/admin" className="nav-link">
              Go to the Admin page
            </Link>
            <Link to="/go" className="nav-link">
              Go to the link page
            </Link>
          </div>

          <div className="flexGrow">
            <button className="sign-out-button" onClick={signOut}>
              Sign Out
            </button>
          </div>
        </section>
      </section>
    );
  }

  return null;
};

export default Admin;
