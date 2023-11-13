import React from "react";
import { smilingadult } from "../../assets";
import SearchForm from "../Forms/SearchForm";
import { useSelector } from "react-redux";
import "./Styles/MainImage.css";
import Loading from "../../assets/Spinners/Loading";

const MainImage = () => {
  const isLoading = useSelector((state) => state.searchResults.loading);
  const isError = useSelector((state) => state.searchResults.error);
  return (
    <div className="main-image-container">
      {/* <img className="main-image" src={smilingadult} alt="smilingadult" /> */}
      <div className="hero">
        <div className="hero_content">
          <h1>Your Space. Their Convenience</h1>
          <SearchForm />
        </div>

        {isLoading && <Loading />}
        {isError && <div className="capsule fail">{isError}</div>}
      </div>
    </div>
  );
};

export default MainImage;
