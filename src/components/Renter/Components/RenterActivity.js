import { useEffect, useState } from "react";
import { useGetActiveByOwnerIdQuery } from "../../../redux/renter/renterApiSlice";
import { useGetUserInfoQuery } from "../../../redux/userActions/userApiSlice";
import UpdateActivity from "./UpdateActivity";
import RenterLoading from "../../../assets/Spinners/RenterLoading";
import "../Styles/RenterActivity.css";
import { FaChevronCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
//Show list of active bookings where the end time is coming up very soon.
// TODO style list
const RenterActivity = () => {
  const {
    data: activeSpaces,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetActiveByOwnerIdQuery();
  const { data: userData } = useGetUserInfoQuery();
  const [bId, setBId] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      if (userData?.id !== activeSpaces[0]?.owner_id) {
        refetch();
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div className="s-loading-container">
        <RenterLoading />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="renter-act-container">
        <header>
          <div className="cl-h-svgleft">
            <Link to="/renter">
              <FaChevronCircleLeft />
            </Link>
          </div>
          {!activeSpaces.length ? (
            <h3>No Activity at this time</h3>
          ) : (
            <h3>The status of your clients</h3>
          )}
        </header>

        {activeSpaces.length > 0 && (
          <div className="renter-uplist-container">
            {activeSpaces.map((booking, idx) => (
              <div
                key={booking?.booking_id}
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  margin: "10px",
                }}
              >
                <i>{idx + 1}</i>
                <p>Booking ID: {booking?.booking_id}</p>
                <p>Active: {booking.is_occupied ? "Yes" : "No"}</p>
                <p>
                  Start Time: {new Date(booking.start_time).toLocaleString()}
                </p>
                <div style={{ color: "darkred" }}>
                  <p>End Time: {new Date(booking.end_time).toLocaleString()}</p>
                </div>
                <p>Final Cost: ${booking.final_cost}</p>
                <div style={{ color: "darkred" }}>
                  <button
                    type="click"
                    onClick={() => setBId(booking?.booking_id)}
                  >
                    Update to Not Occupied
                  </button>
                </div>
              </div>
            ))}
            <section>
              <UpdateActivity
                bId={bId}
                Activity={activeSpaces}
                refetch={refetch}
              />
            </section>
          </div>
        )}
        {!activeSpaces?.length && (
          <div>
            <p>Waiting on booking activity</p>
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return <div>Api Down</div>;
  }
};

export default RenterActivity;

