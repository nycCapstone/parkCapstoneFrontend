import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../../api/axios";
import { useSelector } from "react-redux";
import "./Details.css";

function ParkingSpotDetailPage() {
  const { id } = useParams();
  const [spotDetails, setSpotDetails] = useState({});
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    axios
      .get(`/parking-spots/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        setSpotDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching parking spot details:", error);
      });
  }, [id, accessToken]);

  console.log("spotDetails:", spotDetails);

  return (
    <div className="parking-spot-details-page">
      <h1>Parking Spot Details</h1>
      <div className="details">
        <p className="detail-label">Address:</p>
        <p className="detail-value">{spotDetails.prop_address}</p>
      </div>
      <div className="details">
        <p className="detail-label">Number of Spaces:</p>
        <p className="detail-value">{spotDetails.number_spaces}</p>
      </div>
      <div className="details">
        <p className="detail-label">Billing Type:</p>
        <p className="detail-value">{spotDetails.billing_type}</p>
      </div>
      <div className="details">
        <p className="detail-label">Owner ID:</p>
        <p className="detail-value">{spotDetails.space_owner_id}</p>
      </div>

      {spotDetails.renter && (
        <div>
          <h3>Renter Information</h3>
          <div className="details">
            <p className="detail-label">First Name:</p>
            <p className="detail-value">{spotDetails.renter_first_name}</p>
          </div>
          <div className="details">
            <p className="detail-label">Last Name:</p>
            <p className="detail-value">{spotDetails.renter_last_name}</p>
          </div>
          <div className="details">
            <p className="detail-label">Email:</p>
            <p className="detail-value">{spotDetails.renter_email}</p>
          </div>
        </div>
      )}

      <button className="book-now-button">Book Now</button>

      <Link to="/search-result" className="go-back-link">
        Go back to Search Results
      </Link>
    </div>
  );
}

export default ParkingSpotDetailPage;
