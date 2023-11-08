import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ParkingSpotDetails = ({ spot }) => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  // const handleBack = (event) => {
  //   if (event.keyCode === 8) {
  //     navigate("/parking-spots");
  //   }
  // };

  // const handleBrowserBack = (event) => {
  //   navigate("/parking-spots");
  // };

  // useEffect(() => {
  //   document.addEventListener("keydown", handleBack);
  //   window.addEventListener("popstate", handleBrowserBack);

  //   return () => {
  //     document.removeEventListener("keydown", handleBack);
  //     window.removeEventListener("popstate", handleBrowserBack);
  //   };
  // }, []);

  return (
    <div className="parking-spot-details">
      {toggle ? (
        <div>
          <h2>Property Address: {spot.prop_address}</h2>
          <p>Zip Code: {spot.zip}</p>
          <p>Availability: {spot.occupied ? "No" : "Yes"}</p>
          <p>Number of spaces: {spot.number_spaces}</p>
          <h3>Average Price</h3>
          <p>fixed: {spot.price}</p>
          <h3>Min Price</h3>
          <p>fixed: {spot.min_price}</p>
        </div>
      ) : (
        <div>
          <h2>Property Address: {spot.prop_address}</h2>
          <p>Zip Code: {spot.zip}</p>
          <p>Availability: {spot.occupied ? "No" : "Yes"}</p>
        </div>
      )}
      <button
        className="show_More_Less "
        onClick={() => {
          setToggle(!toggle);
        }}
      >
        {toggle ? "Show Less" : "Show More..."}
      </button>
    </div>
  );
};

export default ParkingSpotDetails;