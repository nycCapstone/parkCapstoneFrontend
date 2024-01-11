import { useEffect, useState } from "react";
import { useGetActiveByOwnerIdQuery } from "../../../redux/renter/renterApiSlice";
import { useGetUserInfoQuery } from "../../../redux/userActions/userApiSlice";
import UpdateActivity from "./UpdateActivity";
import Loading from "../../../assets/Spinners/Loading";
import { FaChevronCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Styles/RenterActivity.css";
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
  const [showUpdateActivity, setShowUpdateActivity] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      if (userData?.id !== activeSpaces[0]?.owner_id) {
        refetch();
      }
    }
  }, []);

  if (isLoading) {
    return <Loading />;
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
          {!activeSpaces.length && (
            <h3 className="renterAct-header">No Activity at this time</h3>
          )}
          {activeSpaces.length > 0 && (
            <h3 className="renterAct-header">The status of your clients.</h3>
          )}
        </header>
        {!activeSpaces.length && (
          <div className="renterAct-info">
            <p className="renterAct-info-para">
              When a customer has booked, paid for a space and the booking time
              period has arrived,
              <br /> you can update the status of the space as occupied or
              unoccupied.
            </p>
          </div>
        )}

        {activeSpaces.length > 0 && (
          <div className="renter-uplist-container">
            {activeSpaces.map((booking, idx) => (
              <div key={booking?.booking_id} className="rent-act-singleSpot">
                <p>
                  <strong>{idx + 1}.</strong>
                </p>

                <div className="rent-act-singleSpotInfo">
                  <p>
                    Booking ID: <strong>{booking?.booking_id} </strong>
                  </p>
                  <p>Active: {booking.is_occupied ? "Yes" : "No"}</p>
                  <p>
                    Start Time: {new Date(booking.start_time).toLocaleString()}
                  </p>
                  <div>
                    <p>
                      End Time: {new Date(booking.end_time).toLocaleString()}
                    </p>
                  </div>
                  <p>Final Cost: ${booking.final_cost}</p>
                </div>
              </div>
            ))}
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
