import React from "react";
import { smilingadult } from "../../assets";
import SearchForm from "../Forms/SearchForm";

import "./Styles/MainImage.css";

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
          <SearchForm />
          <div className="date-picker">
            <button>Check-in Date</button>
            <button>Check-out Date</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
