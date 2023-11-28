import { useGetSoldSpacesQuery } from "../../../redux/renter/renterApiSlice";
import { useGetUserInfoQuery } from "../../../redux/userActions/userApiSlice";
import { useEffect } from "react";
import RenterLoading from "../../../assets/Spinners/RenterLoading";
import "../Styles/SoldSpaces.css";

const SoldSpaces = () => {
  const {
    data: soldSpaces,
    isLoading,
    isSuccess,
    error,
    refetch,
  } = useGetSoldSpacesQuery();
  const { data: userData } = useGetUserInfoQuery();

  useEffect(() => {
    if (isSuccess) {
      if (userData?.id !== soldSpaces[0]?.owner_id) {
        refetch();
      }
    }
  }, []);

  if (isLoading) {
    return <RenterLoading />;
  }

  if (isSuccess) {
    return (
      <div className="sold-spaces-container">
        <header>
        {soldSpaces?.length > 0 ? 
        <h2>Your sold spaces</h2>
        :
        <h2>No sold spaces yet</h2>
        }
        </header>
        {soldSpaces.length > 0 && (
          <div className="sold-spaces-list">
            {soldSpaces.map((booking, idx) => (
              <div key={booking.booking_id} className="sold-spaces-l-item">
                <i>{idx + 1}</i>
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
        )}
      </div>
    );
  }

  if (error) {
    return <div>Api Down</div>;
  }
};

export default SoldSpaces;
