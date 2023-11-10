import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import User from "./User";
import Reservation from "./Reservation";

import Loading from "../../assets/Spinners/Loading";

const Checkout = () => {
  const role = useSelector((state) => !state.roles.hasOwnProperty("Client"));
  const { property_id } = useParams();
  const searchResults = useSelector((state) => state.searchResults.data);
  const {
    data: userData,
    isLoading,
    isSuccess,
    error,
    isUninitialized,
  } = useGetUserInfoQuery({}, { skip: role });

  if (error) {
    return <div>Checkout Api down</div>;
  }

  if (isSuccess || isUninitialized) {
    return (
      <div>
        <section>
          <User userData={userData} />
          <Reservation
            userData={userData}
            searchResults={{ ...searchResults, property_id }}
          />
          <form></form>
        </section>
      </div>
    );
  }
  if (isLoading) {
    return <Loading />;
  }
};

export default Checkout;
