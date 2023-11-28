import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import UserAction from "../../redux/userActions/UserAction";
import { Link } from "react-router-dom";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import "./AdminPage.css";

const AdminPage = () => {
  const { data: userInfo, isSuccess, isLoading, error } = useGetUserInfoQuery();

  if (isLoading) {
    return (
      // TODO all loading components
      <div className="s-loading-container">
        <SearchLoading />
      </div>
    );
  }

  if (error) {
    return <div>Server Fetching Error</div>;
  }

  if (isSuccess)
    return (
      <div className="admin-page">
        <h1>Admin Page</h1>
        <div className="user-info">
          <h2>User Information</h2>
          <p>ID: {userInfo.id}</p>
          <p>
            Name: {userInfo.first_name} {userInfo.last_name}
          </p>
          <p>Address: {userInfo.address}</p>
          <p>Email: {userInfo.email}</p>
          <p>PMT Verified: {userInfo.pmt_verified ? "Yes" : "No"}</p>
          <p>
            Client Background Verified:{" "}
            {userInfo.client_background_verified ? "Yes" : "No"}
          </p>
          <UserAction />
          <div className="roles">
            <h3>Roles</h3>
            <div className="role-list">
              <div className="role-item">
                <h4>Client</h4>
                <p>Background: {userInfo.roles.Client.bckgr ? "Yes" : "No"}</p>
                <p>PMT: {userInfo.roles.Client.pmt ? "Yes" : "No"}</p>
              </div>
              <div className="role-item">
                <h4>ClientOnly</h4>
                <p>{userInfo.roles.ClientOnly ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>
          <Link to="/client/transactions">My Transactions</Link>
        </div>
      </div>
    );
};

export default AdminPage;
