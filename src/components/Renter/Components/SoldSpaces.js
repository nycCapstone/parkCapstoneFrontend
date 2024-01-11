import { useGetSoldSpacesQuery } from "../../../redux/renter/renterApiSlice";
import { useGetUserInfoQuery } from "../../../redux/userActions/userApiSlice";
import { useEffect, useState } from "react";
import Loading from "../../../assets/Spinners/Loading";
import Earnings from "./Earnings";
import { FaPlus } from "react-icons/fa6";
import { FaChevronCircleLeft } from "react-icons/fa";
import { BiSolidEdit } from "react-icons/bi";
import UpdateActivity from "./UpdateActivity";
import { Link } from "react-router-dom";
import { RatingStars } from "../../Location/RatingStars";
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
  const [bId, setBId] = useState(null);
  const [showUpdateActivity, setShowUpdateActivity] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      if (userData?.id !== soldSpaces[0]?.owner_id) {
        refetch();
      }
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess) {
    return (
      <div className="sold-spaces-container">
        <header>
          {soldSpaces?.length > 0 ? (
            <div className="sold-spaces-header">
              <div className="sold-spaces-header-link-container">
                <p className="sold-spaces-header-1">Your Sold Spaces</p>
                <ul>
                  <li className="new-property-li">
                    <FaPlus className="your-booking-icon" />{" "}
                    <Link to="/renter/manage" className="new-property-link">
                      New Space
                    </Link>
                  </li>
                </ul>
              </div>
              <p className="sold-spaces-description">
                Explore comprehensive details about both your past and current
                parking spots that is currently active. Obtain information on
                spot ratings and received payments.
              </p>
              <div className="earnings-total-container">
                <Earnings />
              </div>
            </div>
          ) : (
            <>
              <div className="cl-h-svgleft">
                <Link to="/renter">
                  <FaChevronCircleLeft />
                </Link>
              </div>

              <p className="your-soldspaces-header">No sold spaces yet</p>
            </>
          )}
        </header>
        {soldSpaces.length > 0 && (
          <div className="sold-spaces-list">
            {soldSpaces.map((booking) => (
              <div
                key={booking.booking_id}
                className={
                  booking.is_occupied
                    ? "sold-spaces-wholeCard-active"
                    : "sold-spaces-wholeCard"
                }
              >
                {booking.is_occupied ? (
                  <p className="active-sold-spaces">Active</p>
                ) : (
                  ""
                )}
                <div className="sold-spaces-firstInfo">
                  <label className="sold-space-header-label">Booking ID</label>
                  <p className="sold-space-header-id"> {booking.booking_id}</p>
                </div>
                <div className="sold-spaces-items">
                  <div className="sold-spaces-Single">
                    <label className="sold-space-label"> Start Time</label>
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

                  <div className="sold-spaces-Single">
                    <label className="sold-space-label"> End Time</label>
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

                  <div className="sold-spaces-Single">
                    <label className="sold-space-label">Final cost</label>
                    <p>${booking.final_cost}</p>
                  </div>

                  <div className="sold-spaces-Single">
                    <label className="sold-space-label">rating</label>
                    <RatingStars
                      rating={booking.rating}
                      className="rating-star"
                    />
                  </div>
                </div>
                {booking.is_occupied && (
                  <div className="sold-spaces-update">
                    <ul className="show-space-ul">
                      <button
                        className="show-space-update"
                        type="click"
                        onClick={() => {
                          setBId(booking?.booking_id);
                          if (showUpdateActivity !== booking.booking_id) {
                            setShowUpdateActivity(booking.booking_id);
                          } else {
                            setShowUpdateActivity(null);
                          }
                        }}
                      >
                        <a>
                          {showUpdateActivity === booking.booking_id
                            ? "Close"
                            : "Update"}
                        </a>
                        <BiSolidEdit className="client-booking-icon" />{" "}
                      </button>
                    </ul>
                  </div>
                )}

                {showUpdateActivity === booking.booking_id && (
                  <UpdateActivity
                    bId={bId}
                    setShowUpdateActivity={setShowUpdateActivity}
                    Activity={soldSpaces}
                    refetch={refetch}
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return (
      <div className="gologin-styled-card">
        <Link to="/login" className="gologin-singIn">
          Sign In
        </Link>
      </div>
    );
  }
};

export default SoldSpaces;
