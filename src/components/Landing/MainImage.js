import React from "react";
import { smilingadult } from "../../assets";
import SearchForm from "../Forms/SearchForm";
import { useSelector } from "react-redux";

import "./Styles/MainImage.css";

const MainImage = () => {
  const searchRes = useSelector((state) => state.searchResults.data);
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
          <div>{searchRes && JSON.stringify(searchRes)}</div>
        </div>
      </div>
    </div>
  );
};

export default MainImage;
