import { Link } from "react-router-dom";
import React from "react";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import AdminPage from "../AdminPage/AdminPage";
import "./Admin.css";

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
      <AdminPage />
      <div className="flexGrow">
        <Link to="/home">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
