import React, { useState } from "react";
import { useGetOneSpotQuery } from "../../redux/client/searchApiSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../assets/Spinners/Loading";
import PSMapView from "./PSMapView";
import { RatingStars } from "./RatingStars";
import { BiLinkExternal } from "react-icons/bi";
import "../Client/Styles/SpotDetails.css";

function ParkingSpotDetailPage() {
  const { id } = useParams();
  const query = useSelector((state) => state.landing);
  const navigate = useNavigate();

  const accessToken = useSelector((state) => state.auth.accessToken);
  const {
    data: responseData,
    isSuccess,
    error,
    isLoading,
    isUninitialized,
  } = useGetOneSpotQuery(id, { skip: !accessToken });

  const [errorMessage, setErrorMessage] = useState(null);

  const ends =
    query[query?.length - 1]?.length > 2 ? query[query.length - 1][3] : false;
  const starts = ends ? query[query.length - 1][2] : false;
  const isTimePicked = ends;

  const handleBookNow = () => {
    if (!isTimePicked || !responseData || responseData.length === 0) {
      setErrorMessage("Please go back and pick a time.");
      return;
    }

    const property_id = responseData[0].property_id;
    navigate(
      `/checkout/${property_id.substring(
        0,
        13,
      )}/?starts=${starts}&ends=${ends}`,
    );
  };

  const openGoogleMaps = () => {
    const address = encodeURIComponent(responseData[0].prop_address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`);
  };

  if (isSuccess) {
    const spotDetails = responseData[0];
    const lat = spotDetails.latitude;
    const lng = spotDetails.longitude;
    return (
      <>
        <div className="parking-spot-details-header">
          <p className="details-page-header">
            Explore Your Parking Spot Details
          </p>
          <p className="details-page-description">
            Discover detailed information about your parking spot, including the
            number of available spaces, billing type, spot rating, and spot
            owner details. Navigate through the map view for a visual
            representation and easily book your preferred spot. Take control of
            your parking experience with convenience at your fingertips.
          </p>
        </div>
        <div className="parking-spot-details-page">
          <div className="details-container">
            <div className="details-price-address">
              <div className="details-address">
                <p className="first-address">
                  {spotDetails.prop_address.split(",")[0]}
                </p>
                <p className="second-address">{`${spotDetails.prop_address
                  .split(",")
                  .slice(1)}`}</p>
              </div>

              <p className="details-price">${spotDetails.price}</p>
            </div>

            <div className="details-second-info">
              <div className="details-single">
                <p className="details-label">Number of Spaces:</p>
                <p>{spotDetails.number_spaces}</p>
              </div>

              <div className="details-single">
                <p className="details-label">Billing Type:</p>
                <p>
                  {spotDetails.billing_type[0].toUpperCase() +
                    spotDetails.billing_type.slice(1).toLowerCase() +
                    (spotDetails.billing_type === "fixed" ? "/ Daily" : "")}
                </p>
              </div>

              <div className="details-single">
                <p className="details-label">Rating:</p>
                <RatingStars rating={spotDetails.rating || 5.0} />
              </div>

              {spotDetails?.renter_email && (
                <div className="details-single">
                  <p className="details-label">Spot Owner Name:</p>
                  {spotDetails.first_name[0].toUpperCase() +
                    spotDetails.first_name.slice(1).toLowerCase()}
                </div>
              )}
            </div>
            <div className="details-buttons">
              <button
                onClick={() => navigate(-1)}
                className="details-single-button"
              >
                Go back
              </button>

              <button
                onClick={handleBookNow}
                disabled={!isTimePicked}
                className="details-single-button"
              >
                Book Now
              </button>
            </div>

            {!isTimePicked && (
              <p className="booking-error-message">
                Please go back and pick a time.
              </p>
            )}
          </div>
          <div className="details-map">
            <section className="ps-mapview">
              <PSMapView
                lat={lat}
                lng={lng}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
              />
            </section>
            <div className="view-on-googleMap">
              <button
                className="google-maps-button"
                onClick={openGoogleMaps}
                disabled={!isTimePicked}
              >
                View on Google Map
              </button>
              <BiLinkExternal className="client-booking-icon" />{" "}
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="s-loading-container">
        <Loading />
      </div>
    );
  }

  if (error || isUninitialized) {
    if (error)
      return (
        <div className="gologin-styled-card">
          <Link to="/login/true" className="gologin-singIn">
            Sign In
          </Link>
        </div>
      );
    return <Navigate to="/login" />;
  }
}

export default ParkingSpotDetailPage;
