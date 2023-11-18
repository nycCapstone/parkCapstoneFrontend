import { useEffect, useState } from "react";
import { useGetActiveByOwnerIdQuery } from "../../../redux/renter/renterApiSlice";
import { useGetUserInfoQuery } from "../../../redux/userActions/userApiSlice";
import UpdateActivity from "./UpdateActivity"
import RenterLoading from "../../../assets/Spinners/RenterLoading";
import "../Styles/RenterActivity.css"
//Show list of active bookings where the end time is coming up very soon.
// TODO style list
const RenterActivity = () => {
    const {data: activeSpaces, isLoading, isSuccess, error, refetch } = useGetActiveByOwnerIdQuery();
    const { data: userData } = useGetUserInfoQuery();
    const [bId, setBId] = useState(null);

    useEffect(() => {
       if (isSuccess) {
           if (userData?.id !== activeSpaces[0]?.owner_id) {
            refetch();
           }
       }
    }, [])

    if (isLoading) {
        return <RenterLoading />
    }

    if (isSuccess) {

        return (
            <div className="renter-act-container">
            {!activeSpaces.length && <div>No Activity at this time</div>}
            {activeSpaces.length > 0 && (
              <div className="renter-uplist-container"> 
                <section>

                <h3>The status of your clients</h3>
                {activeSpaces.map((booking, idx) => (
                  <div
                    key={booking?.booking_id}
                    style={{
                      border: "1px solid #ddd",
                      padding: "10px",
                      margin: "10px",
                    }}
                  >
                      <i>{idx+1}</i>
                    <p>Booking ID: {booking?.booking_id}</p>
                    <p>Active: {booking.is_occupied ? "Yes" : "No"}</p>
                    <p>
                      Start Time: {new Date(booking.start_time).toLocaleString()}
                    </p>
                    <div style={{ color: "darkred"}}>
                    <p>End Time: {new Date(booking.end_time).toLocaleString()}</p>
                    </div>
                    <p>Final Cost: ${booking.final_cost}</p>
                    <div style={{ color: "darkred" }}>
                        <button type="click" onClick={() => setBId(booking?.booking_id)}>Update to Not Occupied</button>
                    </div>
                  </div>
                ))}
                </section>
                <section>
                    <UpdateActivity bId={bId} Activity={ activeSpaces } refetch={refetch} />
                </section>
              </div>
            )}
          </div>
        )
    }
 

  if (error) {
    return <div>Api Down</div>
  }
}

export default RenterActivity