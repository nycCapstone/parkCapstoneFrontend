import { Link } from "react-router-dom";
import React from "react";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faRetweet } from "@fortawesome/free-solid-svg-icons";
import AdminPage from "../AdminPage/AdminPage";
import "./Admin.css";
// import User from "../User";

const Admin = () => {
  const { data, refetch, isLoading, isError } = useGetUserInfoQuery();

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

  return (
    <section>
      <AdminPage userInfo={data} />
      <FontAwesomeIcon
        onClick={() => refetch()}
        // icon={faRetweet}
        style={{ cursor: "pointer" }}
      />
      {/* <User /> */}
      <div className="flexGrow">
        <Link to="/home">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
