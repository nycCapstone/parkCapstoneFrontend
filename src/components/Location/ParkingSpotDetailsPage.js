import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../constants/helper/helper";
import axios from "axios";
import "./Details.css";

function ParkingSpotDetailsPage() {
  const [parkingSpots, setParkingSpots] = useState([]);

  useEffect(() => {
    console.log("Component mounted");

    const backendURL =
      BASE_URL + "/parking-spots";

    axios.get(backendURL).then((response) => {
      setParkingSpots(response.data.properties);
    });
  }, []);

  return (
    <div className="parking-spot-details">
      {" "}
      <h1>Parking Spot Details</h1>
      {parkingSpots.map((spot) => (
        <div className="parking-spot-card" key={spot.property_id}>
          {" "}
          <h2>Property Address: {spot.prop_address}</h2>
          <p>Number of Spaces: {spot.number_spaces}</p>
          <p>Billing Type: {spot.billing_type}</p>
        </div>
      ))}
    </div>
  );
}

export default ParkingSpotDetailsPage;
