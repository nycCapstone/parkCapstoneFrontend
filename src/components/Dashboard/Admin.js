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
