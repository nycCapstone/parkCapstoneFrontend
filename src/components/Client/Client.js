import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useSelector } from "react-redux";
import Loading from "../../assets/Spinners/Loading";
import { Link } from "react-router-dom";
import ClientBookings from "./ClientBookings";
import { FaChevronCircleLeft } from "react-icons/fa";
import "./Styles/Client&ClientSearch.css";
const Client = () => {
  const { data: userData, isLoading } = useGetUserInfoQuery();
  const roles = useSelector((state) => state.roles);
  return (
    <div>
      <section>
        <div style={{ display: "flex" }}>
          <div>
            <Link to="/admin">
              <FaChevronCircleLeft />
            </Link>
          </div>
          <div>
            <h1>Client Page</h1>
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : userData?.all_is_auth || (roles?.Renter && roles.Client.bckgr) ? (
          <nav>
            <div>
              <p>Search and Make a new booking.</p>
              <Link to="/client/search">Search Page</Link>
            </div>
            <div>
              <Link to="/client/transactions">My Activity</Link>
            </div>
          </nav>
        ) : (
          <div>Bookings made easy after you confirm your details.</div>
        )}
      </section>
      <section>
        <ClientBookings />
      </section>
    </div>
  );
};

export default Client;
