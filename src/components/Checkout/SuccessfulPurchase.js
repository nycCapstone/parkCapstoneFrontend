import { useGetClientTransactionsQuery } from "../../redux/checkout/checkoutApiSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import { useParams } from "react-router-dom";
import { resetRInfoCache } from "../../redux/checkout/reservationSlice";
import { resetSearchState } from "../../redux/search/searchResultsSlice";
import { resetBookings } from "../../redux/client/clientSearchSlice";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import "./Styles/SuccessfulPurchase.css";
import { Link } from "react-router-dom";

const SuccessfulPurchase = () => {
  const { data: userInfo } = useGetUserInfoQuery();
  const { nav_id, pmt_id } = useParams();
  const resInfo = useSelector((state) => state.reservation);
  const dispatch = useDispatch();
  const {
    data: activity,
    isSuccess,
    isLoading,
    error,
    isUninitialized,
  } = useGetClientTransactionsQuery({}, { refetchOnMountOrArgChange: true });

  const [toast, setToast] = useState(null);
  const [reservationInfo, setReservationInfo] = useState({});

  useEffect(() => {
    if (resInfo?.nav_id === nav_id && pmt_id) {
      //erase most recent reservation details
      setReservationInfo(resInfo);
      dispatch(resetRInfoCache());
      dispatch(resetSearchState());
      dispatch(resetBookings());
      setToast(true);
    }
  }, []);

  if (isLoading || isUninitialized) {
    return <SearchLoading />;
  }

  if (isSuccess) {
    return (
      <div className="myactivity-container">
        {activity && toast ? (
          <>
            <h3>
              Congratulations, {userInfo.first_name}! Your reservation is
              confirmed!
            </h3>
            <div className="payment-list">
              <div className="newest-transactions">
                <div className="box">
                  <div className="success alert">
                    <div className="alert-body">
                      {activity?.find((item) => item.pmt_id === pmt_id) &&
                        "successfully paid"}
                    </div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                <p>Your Payment ID is {activity[0].pmt_id}</p>
                <p>
                  Your reservation at{" "}
                  {reservationInfo.selected_space.prop_address} from{" "}
                  {new Date(reservationInfo.query_data[2]).toLocaleTimeString(
                    undefined,
                    {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }
                  )}{" "}
                  on{" "}
                  {new Date(reservationInfo.query_data[2]).toLocaleDateString()}{" "}
                  to{" "}
                  {new Date(reservationInfo.query_data[3]).toLocaleTimeString(
                    undefined,
                    {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }
                  )}{" "}
                  on{" "}
                  {new Date(reservationInfo.query_data[3]).toLocaleDateString()}{" "}
                  is all set!
                </p>
                <p>
                  Your reservation total is $
                  {reservationInfo.selected_space.final_price}
                </p>
                <p>Please print out this page for your records!</p>
              </div>
            </div>
          </>
        ) : (
          <div className="no-activity">No Data Yet</div>
        )}
        <Link to="/admin">Administrator Page</Link>
      </div>
    );
  }

  if (error) {
    return <div>Api Down</div>;
  }
};

export default SuccessfulPurchase;
