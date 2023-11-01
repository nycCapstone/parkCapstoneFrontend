import React from "react";
import { smilingadult } from "../../assets";

import "./MainImage.css";

function MainImage() {
  return (
    <div className="main-image-container">
      <img
        className="main-image img-fluid"
        src={smilingadult}
        alt="smilingadult"
      />
      <div className="overlay">
        <div className="fw-bold">Your Space. Their convenience.</div>
        <div className="search-bar">
          <input type="text" placeholder="Enter location or zip code" />
          <div className="date-picker">
            <button>Check-in Date</button>
            <button>Check-out Date</button>
          </div>
          <button className="button">Search</button>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
