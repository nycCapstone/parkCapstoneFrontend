import { useGetBookingsQuery } from "../../redux/checkout/checkoutApiSlice";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useEffect, useState } from "react";
import { calculateDateDifferenceInDays } from "../../constants/helper/helper";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import { FaEdit } from "react-icons/fa";
import EditStars from "./Views/EditStars";
import {Link} from "react-router-dom"
import "./Styles/BookingsComponent.css";


const ClientBookings = () => {
 const {
   data: bookings,
   isSuccess,
   isLoading,
   error,
   refetch,
 } = useGetBookingsQuery();
 const { data: userData } = useGetUserInfoQuery();
 const [show, setShow] = useState(null);


 useEffect(() => {
   if (isSuccess) {
     if (userData?.id !== bookings[0]?.customer_booking_id) {
       refetch();
     }
   }
 }, []);


 if (isLoading) {
   return (
     <div className="s-loading-container">
       <SearchLoading />
     </div>
   );
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
           <header className="m-bookings-header">
             <h2>Your bookings</h2>
           </header>
           <div className="bookings-grid-container">
             {bookings.map((booking, i) => (
               <div key={booking.booking_id} className="booking-item">
                 <p className="booking-label">Order Number - {booking.booking_id}</p>
                 <p>Active: {booking.is_occupied ? "Yes" : "No"}</p>
                 <p>
                   Start Time: {new Date(booking.start_time).toLocaleString()}
                 </p>
                 <p>End Time: {new Date(booking.end_time).toLocaleString()}</p>
<p className="booking-addr-label">Address: {booking.prop_address}</p>
                 <p className="booking-fc-label">Final Cost: ${booking.final_cost}</p>
                 <div style={{display: "flex", flexWrap: "wrap"}}>
                 <p>Rating: {booking.rating}</p>
                 {
                   calculateDateDifferenceInDays(booking.end_time) < 13 && <FaEdit style={{marginLeft: "1rem", cursor: "pointer"}} onClick={() => {
                     setShow(i)
                   }}/>
                 }
                 {
                   show === i && <EditStars booking={booking} setShow={setShow} refetch={refetch}/>
                 }
                 </div>
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

