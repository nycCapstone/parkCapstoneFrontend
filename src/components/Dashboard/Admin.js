import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import AdminPage from "../AdminPage/AdminPage";
import "./Styles/Admin.css";

const Admin = () => {
  const { data, isLoading, isError, isSuccess, error, refetch } =
    useGetUserInfoQuery();

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
    return <AdminPage />;
  }

  if (error) {
    return <div>Api Down</div>;
  }
};

export default Admin;
