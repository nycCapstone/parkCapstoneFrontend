import { useGetBookingsQuery } from "../../redux/checkout/checkoutApiSlice";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useEffect } from "react";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import "./Styles/BookingsComponent.css"

const ClientBookings = () => {
  const {
    data: bookings,
    isSuccess,
    isLoading,
    error,
    refetch,
  } = useGetBookingsQuery();
  const { data: userData } = useGetUserInfoQuery();

  useEffect(() => {
    if (isSuccess) {
      if (userData?.id !== bookings[0]?.customer_booking_id) {
        refetch();
      }
    }
  }, []);

  if (isLoading) {
    return <SearchLoading />;
  }
  if (error) {
    return <div>Api Down</div>;
  }

  if (isSuccess) {
    return (
      <div className="bookings-container">
        {!bookings.length && <div>No bookings made yet</div>}
        {bookings.length > 0 && (
            <>
            <h3>Your bookings</h3>
            <div className="bookings-grid-container">

            {bookings.map((booking) => (
              <div
                key={booking.booking_id}
                className="booking-item"
              >
                <p>Booking ID: {booking.booking_id}</p>
                <p>Active: {booking.is_occupied ? "Yes" : "No"}</p>
                <p>
                  Start Time: {new Date(booking.start_time).toLocaleString()}
                </p>
                <p>End Time: {new Date(booking.end_time).toLocaleString()}</p>
                <p>Final Cost: ${booking.final_cost}</p>
                <p>Rating: {booking.rating}</p>
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
