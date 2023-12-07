import { useGetClientTransactionsQuery } from "../../redux/checkout/checkoutApiSlice";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import { FaChevronCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Styles/MyActivity.css";

const MyActivity = () => {
  const {
    data: activity,
    isSuccess,
    isLoading,
    error,
    isUninitialized,
  } = useGetClientTransactionsQuery({}, { refetchOnMountOrArgChange: true });

  if (isLoading || isUninitialized) {
    return (
      <div className="s-loading-container">
        <SearchLoading />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="myactivity-container">
        <header>
          <div className="cl-h-svgleft">
            <Link to="/client">
              <FaChevronCircleLeft />
            </Link>
          </div>
          <h2>Most Recent bookings paid for</h2>
        </header>
        {activity?.length > 0 ? (
          <div className="mi-payment-list">
            {activity.map((item, idx) => {
              return (
                <div key={idx} className="mi-payment-list-item">
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
          <div className="no-activity" style={{ marginLeft: "2rem" }}>
            You currently do not have any transactions yet!
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return <div>Api Down</div>;
  }
};

export default MyActivity;
