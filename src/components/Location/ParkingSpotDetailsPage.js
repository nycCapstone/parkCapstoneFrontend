import React, { useEffect, useState } from "react";
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
  const checkIn = params.get("starts");
  const checkOut = params.get("ends");
  console.log("params:", { id, checkIn, checkOut });

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

  const handleBookNow = () => {
    // const params = new URLSearchParams(window.location.search);
    const starts = params.get("starts");
    const ends = params.get("ends");

    console.log("Book Now clicked. Parameters:", { id, starts, ends });

    if (starts && ends && responseData && responseData.length > 0) {
      const property_id = responseData[0].property_id;
      navigate(
        `/checkout/${property_id.substring(
          0,
          13
        )}/?starts=${starts}&ends=${ends}`
      );
    } else {
      console.error("starts, ends, or responseData is undefined or empty");
      setErrorMessage("Please go back and pick a time.");
    }
  };

  useEffect(() => {
    // const params = new URLSearchParams(window.location.search);
    console.log("URL Parameters in useEffect:", {
      id,
      starts: checkIn,
      ends: checkOut,
    });
    console.log("Query Parameters in useEffect:", params);
  }, [id, checkIn, checkOut]);

  // useEffect(() => {
  //   const params = new URLSearchParams(window.location.search);
  //   console.log("params:", params);
  // }, []);

  if (isSuccess) {
    const spotDetails = responseData[0];
    const lat = spotDetails.latitude;
    const lng = spotDetails.longitude;

    return (
      <div className="parking-spot-details-page">
        <Link to="/search-result" className="go-back-link">
          <span className="go-back-icon">&#8678;</span> Go back
        </Link>
        <div className="details-container">
          {/* Details Information */}
          <div className="title">
            <h1>{spotDetails.prop_address}</h1>
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
            <p className="detail-value">
              <RatingStars rating={spotDetails.rating || 5.0} />
            </p>
          </div>
          {spotDetails.renter_id && (
            <div>
              <h3>Renter Information</h3>
              <div className="details">
                <p className="detail-label">Spot Owner Name:</p>
                <p className="detail-value">{spotDetails.client_first_name}</p>
              </div>
            </div>
          )}
          <button className="book-now-button" onClick={handleBookNow}>
            Book Now
          </button>
        </div>

        <section className="ps-mapview">
          <PSMapView
            lat={lat}
            lng={lng}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </section>
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
