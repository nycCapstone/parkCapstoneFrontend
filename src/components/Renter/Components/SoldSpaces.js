import { useGetSoldSpacesQuery } from "../../../redux/renter/renterApiSlice";
import { useGetUserInfoQuery } from "../../../redux/userActions/userApiSlice";
import { useEffect } from "react";
import RenterLoading from "../../../assets/Spinners/RenterLoading";

const SoldSpaces = () => {
 const {data: soldSpaces, isLoading, isSuccess, error, refetch } = useGetSoldSpacesQuery();
 const { data: userData } = useGetUserInfoQuery();

 useEffect(() => {
    if (isSuccess) {
        if (userData?.id !== soldSpaces[0]?.owner_id) {
         refetch();
        }
    }
 }, [])
 

 if (isLoading) {
    return <RenterLoading />
 }

 if (isSuccess) {
    return (
        <div className="soldSpaces-container">
          {!soldSpaces.length && <div>No sold spaces yet</div>}
          {soldSpaces.length > 0 && (
            <div>
              <h3>Your sold spaces</h3>
              {soldSpaces.map((booking, idx) => (
                <div
                  key={booking.booking_id}
                  style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    margin: "10px",
                  }}
                >
                    <i>{idx+1}</i>
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
     return <div>Api Down</div>
    }
}

export default SoldSpaces