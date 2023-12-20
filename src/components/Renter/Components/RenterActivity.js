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
        <strong className="status-clients">The status of your clients</strong>
        {!activeSpaces.length && (
          <>
            <div className="cl-h-svgleft">
              <Link to="/renter">
                <FaChevronCircleLeft />
              </Link>
            </div>
            <p className="renter-no-activity">No Activity at this time</p>
          </>
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
                  <div>
                    <button
                      className="renter-prop-button"
                      type="click"
                      onClick={() => {
                        setBId(booking?.booking_id);
                        {
                          if (showUpdateActivity !== booking.booking_id)
                            setShowUpdateActivity(booking.booking_id);
                          else setShowUpdateActivity(null);
                        }
                      }}
                    >
                      {showUpdateActivity === booking.booking_id
                        ? "Close"
                        : "Update"}
                    </button>
                  </div>
                  {showUpdateActivity === booking.booking_id && (
                    <UpdateActivity
                      bId={bId}
                      Activity={activeSpaces}
                      refetch={refetch}
                    />
                  )}
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
