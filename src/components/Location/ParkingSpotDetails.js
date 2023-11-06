import React from "react";

const ParkingSpotDetails = ({ spot }) => {
  return (
    <div className="parking-spot-details">
      <h1>Parking Spot Details</h1>
      <div className="parking-spot-card">
        <h2>Property Address: {spot.prop_address}</h2>
        <p>Number of Spaces: {spot.number_spaces}</p>
        <p>Billing Type: {spot.billing_type}</p>
      </div>
    </div>
  );
};

export default ParkingSpotDetails;
