import { useGetClientTransactionsQuery } from "../../redux/checkout/checkoutApiSlice";
import SearchLoading from "../../assets/Spinners/SearchLoading";
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
    return <SearchLoading />;
  }

  if (isSuccess) {
    return (
      <div className="myactivity-container">
        <h3>Most Recent bookings paid for</h3>

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
          <div className="no-activity">
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
