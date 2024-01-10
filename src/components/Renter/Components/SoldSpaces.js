import { useGetSoldSpacesQuery } from "../../../redux/renter/renterApiSlice";
import { useGetUserInfoQuery } from "../../../redux/userActions/userApiSlice";
import { useEffect } from "react";
import Loading from "../../../assets/Spinners/Loading";
import { FaChevronCircleLeft } from "react-icons/fa";
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
              <p className="sold-spaces-header-1">Your Sold Spaces</p>
              <p className="sold-spaces-description">
                Explore comprehensive details about both your past and current
                parking spots that is currently active. Obtain information on
                spot ratings and received payments.
              </p>
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
