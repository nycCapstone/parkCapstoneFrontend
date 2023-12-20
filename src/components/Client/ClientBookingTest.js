import React from "react";
import { useGetBookingsQuery } from "../../redux/checkout/checkoutApiSlice";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useEffect, useState } from "react";
import { calculateDateDifferenceInDays } from "../../constants/helper/helper";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import { RatingStars } from "../Location/RatingStars";
import { BiLinkExternal } from "react-icons/bi";
import { BiSolidEdit } from "react-icons/bi";
import { FaEdit } from "react-icons/fa";
import EditStars from "./Views/EditStars";
import { Link } from "react-router-dom";
import "./Styles/BookingsComponent.css";
function ClientBookingTest() {
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
        {!bookings.length && (
          <div className="no-bookings-message">No bookings made yet</div>
        )}
        {bookings.length > 0 && (
          <div className="client-booking-info">
            {bookings.map((booking, i) => (
              <div
                key={booking.booking_id}
                className={
                  booking.is_occupied
                    ? "client-booking-single-active"
                    : "client-booking-single"
                }
              >
                {booking.is_occupied ? (
                  <p className="active-client-booking">Active</p>
                ) : (
                  ""
                )}
                <div className="client-booking-firstInfo">
                  <div className="client-booking-header">
                    <div className="client-booking-address">
                      <p className="first-address">
                        {booking.prop_address.split(",")[0]}
                      </p>
                      <p className="second-address">{`${booking.prop_address
                        .split(",")
                        .slice(1)}`}</p>
                    </div>
                    <p className="client-booking-price">
                      ${booking.final_cost}
                    </p>
                  </div>
                </div>

                <div className="client-booking-secondInfo">
                  <div className="client-booking-secondInfo-Single">
                    <label className="client-booking-label">rating</label>
                    <RatingStars
                      rating={booking.rating}
                      className="rating-star"
                    />
                    {show === i && (
                      <EditStars
                        booking={booking}
                        setShow={setShow}
                        refetch={refetch}
                      />
                    )}
                  </div>
                  <div className="client-booking-secondInfo-Single">
                    <label className="client-booking-label">order number</label>
                    <p>{booking.booking_id}</p>
                  </div>
                  <div className="client-booking-secondInfo-Single">
                    <label className="client-booking-label">arrival</label>
                    <p>
                      {new Date(booking.start_time).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p>
                      {new Date(booking.start_time).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="client-booking-secondInfo-Single">
                    <label className="client-booking-label">departure</label>
                    <p>
                      {new Date(booking.end_time).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <p>
                      {new Date(booking.end_time).toLocaleString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <div className="client-booking-newLinks">
                  <ul className="client-booking-ul">
                    <li className="client-booking-li">
                      <Link
                        to=""
                        className="new-booking-link"
                        onClick={() => {
                          setShow(i);
                        }}
                      >
                        Edit rating
                      </Link>
                      <BiSolidEdit className="client-booking-icon" />{" "}
                    </li>
                    <li className="client-booking-li">
                      <Link
                        to={`/spot-details/${booking.booking_space_id}`}
                        className="myActivityLink"
                      >
                        view receipt
                      </Link>
                      <BiLinkExternal className="client-booking-icon" />{" "}
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default ClientBookingTest;
