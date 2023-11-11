import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useSelector } from "react-redux";
import Loading from "../../assets/Spinners/Loading";
import { Link } from "react-router-dom";
import ClientSearchForm from "./ClientSearchForm";
import CLSearchResults from "./Views/CLSearchResults";
import { FaChevronCircleLeft } from "react-icons/fa";

const Client = () => {
  const { data: userData, isLoading } = useGetUserInfoQuery();
  const roles = useSelector(state => state.roles)
  return (
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
      <br />
      {
        isLoading 
        ?
        <Loading />
        :
        userData?.all_is_auth || (roles?.Renter && roles.Client.bckgr)
        ?
        <>
      <p>This is where you can make a booking.</p>
      <ClientSearchForm />
      <CLSearchResults />
        </>
        :
        <div>Bookings made easy after you confirm your details.</div>
      }
    </section>
  );
};

export default Client;
