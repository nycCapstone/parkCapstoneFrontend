import React from "react";
import { useGetBookingsQuery } from "../../redux/checkout/checkoutApiSlice";
import { useState } from "react";
import { calculateDateDifferenceInDays } from "../../constants/helper/helper";
import { useSelector } from "react-redux";
import Loading from "../../assets/Spinners/Loading";
import { RatingStars } from "../Location/RatingStars";
import { BiLinkExternal } from "react-icons/bi";
import { BiSolidEdit } from "react-icons/bi";
import EditStars from "./Views/EditStars";
import { Link } from "react-router-dom";
import "./Styles/ClientBookings.css";

function ClientBookings() {
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
    const bookingsfiltered = bookings.filter((item) => {
      if (!bookings.length) return false;
      if (item.is_occupied && resInfo?.booking_id === item.booking_id) {
        return true;
      }
      if (item.isactive) {
        return true;
      }
      return false;
    });

    return (
      <div className="bookings-container">
        {!bookingsfiltered.length && (
          <div className="no-bookings-message">No bookings made yet</div>
        )}
        {bookingsfiltered.length > 0 && (
          <div className="client-booking-info">
            {bookingsfiltered.map((booking, i) => (
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
                  {booking.pmt_id && (
                    <div className="client-booking-secondInfo-Payment">
                      <div className="client-more-payment">
                        <label className="client-booking-label">
                          Payment Id
                        </label>
                        <p>***{booking.pmt_id.slice(27)}</p>
                      </div>

                      <div className="client-more-payment">
                        <label className="client-booking-label">
                          Payment Date
                        </label>
                        <p>
                          {new Date(booking.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  )}

                  {resInfo?.booking_id === booking.booking_id && (
                    <div className="complete-payment">
                      <label className="client-booking-label">
                        Complete Payment
                      </label>
                      <p>
                        Click{" "}
                        <Link
                          to={`/payment/${resInfo.booking_id}`}
                          className="complete-payment-proceed"
                        >
                          here
                        </Link>{" "}
                        to proceed with your order
                      </p>
                    </div>
                  )}
                </div>
                <div className="client-booking-newLinks">
                  <ul className="client-booking-ul">
                    {calculateDateDifferenceInDays(booking.end_time) < 13 &&
                      booking.isactive && (
                        <li className="client-booking-li">
                          <Link
                            to=""
                            className="new-booking-link"
                            onClick={() => {
                              if (i !== show) setShow(i);
                              else setShow(null);
                            }}
                          >
                            Edit rating
                          </Link>
                          <BiSolidEdit className="client-booking-icon" />{" "}
                        </li>
                      )}

                    <li className="client-booking-li">
                      <Link
                        to={`/spot-details/${booking.booking_space_id}`}
                        className="myActivityLink"
                      >
                        view details
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

export default ClientBookings;
