import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useSelector } from "react-redux";
import RenterLoading from "../../assets/Spinners/RenterLoading";
import { Link } from "react-router-dom";
import ClientBookings from "./ClientBookings";
import { FaChevronCircleLeft } from "react-icons/fa";
import "./Styles/Client&ClientSearch.css";

const Client = () => {
  const { data: userData, isLoading } = useGetUserInfoQuery();
  const roles = useSelector((state) => state.roles);
  return (
    <div className="cl-views-container">
      <nav className="clview-navbar">
        <div className="cl-h-svgleft">
          <Link to="/admin">
            <FaChevronCircleLeft />
          </Link>
        </div>
        <h2>Client Page</h2>
        {isLoading ? (
          <div className="s-loading-container">
            <RenterLoading />
          </div>
        ) : userData?.all_is_auth || (roles?.Renter && roles.Client.bckgr) ? (
          <>
            <div className="clview-nav-item">
              <Link to="/client/search">
                Search and Make a new booking. <br />
                Search Page
              </Link>
            </div>
            <div className="clview-nav-item">
              <Link to="/client/transactions">My Activity</Link>
            </div>
          </>
        ) : (
          <div className="clview-nav-item">
            Bookings made easy after you confirm your details.
          </div>
        )}
      </nav>
      <ClientBookings />
    </div>
  );
};

export default Client;
