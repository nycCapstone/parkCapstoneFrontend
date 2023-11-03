import React from "react";
import { smilingadult } from "../../assets";
import SearchForm from "../Forms/SearchForm";
import { useSelector } from "react-redux";
import "./Styles/MainImage.css";

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
          <div>
            <div className="searchres-elem">
              <div className="scrollable-div">
                {searchRes &&
                  searchRes.map((item, i) => {
                    return (
                      <div className="spot-info" key={i}>
                        <h3>{i+1}</h3>
                        <p>Address: {item.prop_address}</p>
                        <p>Zip Code: {item.zip}</p>
                        <p>Space type: {item.sp_type}</p>
                        <p>Available?: {item.occupied ? "No" : "Yes"}</p>
                        <p>Space ID: {item.space_id}</p>
                        <div className="cost-info">
                          <h3>Price</h3>
                          <div className="cost-list">
                            <div className="cost-item">
                              <p>{item.billing_type}</p>
                              <p>{item.price}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainImage;
