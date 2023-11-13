import { useGetClientTransactionsQuery } from "../../redux/checkout/checkoutApiSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import { useParams } from "react-router-dom";
import { resetRInfoCache } from "../../redux/checkout/reservationSlice";
import { resetSearchState } from "../../redux/search/searchResultsSlice";
import { resetBookings } from "../../redux/client/clientSearchSlice";
import "./Styles/MyActivity.css";

const MyActivity = () => {
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

  useEffect(() => {
    if (resInfo?.nav_id === nav_id && pmt_id) {
    //erase most recent reservation details
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
        <h3>Most Recent bookings paid for</h3>
        {toast && activity?.length > 0 && (
          <div className="newest-transactions">
            <div class="box">
              <div class="success alert">
                <div class="alert-body">
                  {activity?.find((item) => item.pmt_id === pmt_id) &&
                    "successfully paid"}
                </div>
              </div>
            </div>
          </div>
        )}
        {activity?.length > 0 ? (
          <div className="payment-list">
            {activity.map((item, idx) => {
              return (
                <div
                  key={idx}
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    margin: "10px",
                  }}
                >
                  <i>{idx + 1}</i>
                  <p>Pmt Id: {item.pmt_id}</p>
                  <p>Card Expires: {item.expiry}</p>
                  <p>Booking Id: {item.pmt_booking_id}</p>
                  <p>
                    Pmt made @: {new Date(item.timestamp).toLocaleDateString()}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="no-activity">No Data Yet</div>
        )}
      </div>
    );
  }

  if (error) {
    return <div>Api Down</div>;
  }
};

export default MyActivity;
