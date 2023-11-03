import React from "react";
import { Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";

import "./Home.css";

const Home = () => {
  const { data: userData, isSuccess, isLoading, error } = useGetUserInfoQuery();
  const logout = useLogout();

  const signOut = async () => {
    await logout();
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <section className="home-container">
        <h1>Welcome Home</h1>
        {userData?.email && <p>Email: {userData?.email}</p>}

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
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Server Error</p>
      </div>
    );
  }
};

export default Home;
