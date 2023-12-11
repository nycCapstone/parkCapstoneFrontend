import React, { useState, useEffect } from "react";
import { useGetOneSpotQuery } from "../../redux/client/searchApiSlice";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import PSMapView from "./PSMapView";
import { RatingStars } from "./RatingStars";
import "./Details.css";

function ParkingSpotDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
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

  const starts = params.get("starts");
  const ends = params.get("ends");

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
    const lat = responseData[0].latitude;
    const lng = responseData[0].longitude;
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
    );
  };

  if (isSuccess) {
    const spotDetails = responseData[0];
    const lat = spotDetails.latitude;
    const lng = spotDetails.longitude;
    return (
      <div className="parking-spot-details-page">
        <Link className="go-back-link" onClick={() => navigate(-1)}>
          <span className="go-back-icon">&#8678;</span> Go back
        </Link>

        <div className="details-container">
          {/* Details Information */}
          <div className="title">
            <h1>{spotDetails.prop_address.slice(0, -5)}</h1>
          </div>
          <div className="details">
            <p className="detail-label">Number of Spaces:</p>
            <p className="detail-value">{spotDetails.number_spaces}</p>
          </div>
          <div className="details">
            <p className="detail-label">Billing Type:</p>
            <p className="detail-value">{spotDetails.billing_type}/daily</p>
          </div>
          <div className="details">
            <p className="detail-label">Price:</p>
            <p className="detail-value">${spotDetails.price}</p>
          </div>
          <div className="details">
            <p className="detail-label">Owner ID:</p>
            <p className="detail-value">{spotDetails.space_owner_id}</p>
          </div>
          <div className="details">
            <p className="detail-label">Rating:</p>
            <div>
              <RatingStars rating={spotDetails.rating || 5.0} />
            </div>
          </div>
          {spotDetails.renter_id && (
            <div>
              {/* <h3>Renter Information</h3> */}
              <div className="details">
                <p className="detail-label">Spot Owner Name:</p>
                <p className="detail-value">
                  {spotDetails.client_first_name[0].toUpperCase() +
                    spotDetails.client_first_name.slice(1).toLowerCase()}
                </p>
              </div>
            </div>
          )}

          <button
            className="book-now-button"
            onClick={handleBookNow}
            disabled={!isTimePicked}
          >
            Book Now
          </button>
          {!isTimePicked && (
            <p className="booking-error-message">
              Please go back and pick a time.
            </p>
          )}
        </div>
        <div className="showpage-map-button-container">
          <section className="ps-mapview">
            <PSMapView
              lat={lat}
              lng={lng}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </section>
          <button
            className="google-maps-button"
            onClick={openGoogleMaps}
            disabled={!isTimePicked}
          >
            <i
              className="fa-solid fa-location-dot"
              style={{ marginRight: "0.5rem" }}
            ></i>
            <span className="google-maps-text">View in Google Maps</span>
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="s-loading-container">
        <SearchLoading />
      </div>
    );
  }

  if (error || isUninitialized) {
    if (error) return <div>Api Down</div>;
    return <Navigate to="/login" />;
  }
}

export default ParkingSpotDetailPage;
