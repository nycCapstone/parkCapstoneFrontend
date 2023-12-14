import React, { useState, useEffect } from "react";
import { useGetOneSpotQuery } from "../../redux/client/searchApiSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import PSMapView from "../Location/PSMapView";
import { RatingStars } from "../Location/RatingStars";
import "./Styles/SpotDetails.css";

function SpotDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const accessToken = useSelector((state) => state.auth.accessToken);
  const {
    data: responseData,
    isSuccess,
    error,
    isLoading,
    isUninitialized,
  } = useGetOneSpotQuery(id, { skip: !accessToken });

  useEffect(() => {
    console.log("SpotDetails component mounted");
  }, []);

  const openGoogleMaps = () => {
    const address = encodeURIComponent(responseData[0].prop_address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`);
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
              <div className="details">
                <p className="detail-label">Spot Owner Name:</p>
                <p className="detail-value">
                  {spotDetails.client_first_name[0].toUpperCase() +
                    spotDetails.client_first_name.slice(1).toLowerCase()}
                </p>
              </div>
            </div>
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
          <button className="google-maps-button" onClick={openGoogleMaps}>
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
  }
}

export default SpotDetails;
