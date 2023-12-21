import { useGetBookingsQuery } from "../../redux/checkout/checkoutApiSlice";
import { useState } from "react";
import { calculateDateDifferenceInDays } from "../../constants/helper/helper";
import Loading from "../../assets/Spinners/Loading";
import { useSelector } from "react-redux";
import { RatingStars } from "../Location/RatingStars";
import { FaEdit } from "react-icons/fa";
import EditStars from "./Views/EditStars";
import { Link } from "react-router-dom";
import "./Styles/BookingsComponent.css";

const ClientBookings = () => {
  const {
    data: bookings,
    isSuccess,
    isLoading,
    error,
    isUninitialized,
    refetch,
  } = useGetBookingsQuery({}, { refetchOnMountOrArgChange: true });
  const [show, setShow] = useState(null);
  const resInfo = useSelector((state) => state.reservation);

  if (isLoading || isUninitialized) {
    return (
      <div className="s-loading-container">
        <Loading />
      </div>
    );
  }
  if (error) {
    return <div>Api Down</div>;
  }

  if (isSuccess) {
    return (
      <div className="bookings-container">
        {!bookings.length && (
          <div className="no-bookings-message">No bookings made yet</div>
        )}
        {bookings.length > 0 && (
          <>
            <header className="m-bookings-header">
              <h2>Your bookings</h2>
            </header>
            <div className="bookings-grid-container">
              {bookings.map((booking, i) => (
                <div
                  key={booking.booking_id}
                  className="booking-item"
                  style={{
                    height:
                      resInfo?.booking_id === booking.booking_id
                        ? "230px"
                        : "auto",
                  }}
                >
                  <p className="booking-label">
                    Order Number - {booking.booking_id}
                  </p>
                  <p>Active: {booking.is_occupied ? "Yes" : "No"}</p>
                  <p>
                    Start Time: {new Date(booking.start_time).toLocaleString()}
                  </p>
                  <p>End Time: {new Date(booking.end_time).toLocaleString()}</p>
                  <p className="booking-addr-label">
                    Address: {booking.prop_address}
                  </p>
                  <p className="booking-fc-label">
                    Final Cost: ${booking.final_cost}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    <p>Rating: </p>
                    <RatingStars rating={booking.rating} />
                    {calculateDateDifferenceInDays(booking.end_time) < 13 &&
                      booking.isactive && (
                        <FaEdit
                          style={{ marginLeft: "1rem", cursor: "pointer" }}
                          onClick={() => {
                            if (i !== show) setShow(i);
                            else setShow(null);
                          }}
                        />
                      )}
                    {show === i && (
                      <EditStars
                        booking={booking}
                        setShow={setShow}
                        refetch={refetch}
                      />
                    )}
                  </div>
                  <Link
                    to={`/spot-details/${booking.booking_space_id}`}
                    className="view-more-link"
                    onClick={() => console.log("Navigating to SpotDetails")}
                  >
                    View More
                  </Link>
                  {booking.pmt_id && (
                    <>
                      <p>Payment Id: {booking.pmt_id}</p>

                      <p>Card Expires: {booking.expiry}</p>
                      <p>
                        Pmt made @:{" "}
                        {new Date(booking.timestamp).toLocaleDateString()}
                      </p>
                    </>
                  )}
                  {resInfo?.booking_id === booking.booking_id && (
                    <>
                      <Link
                        to={`/payment/${resInfo.booking_id}`}
                        className="view-more-link"
                      >
                        Complete Payment
                      </Link>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }
};

export default ClientBookings;
