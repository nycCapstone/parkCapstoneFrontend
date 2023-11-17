import React from "react";
import SearchForm from "../Forms/SearchForm";
import { useSelector } from "react-redux";
import Loading from "../../assets/Spinners/Loading";
import "./Styles/Hero.css";

function Hero() {
  const isLoading = useSelector((state) => state.searchResults.loading);
  const isError = useSelector((state) => state.searchResults.error);
  return (
    <div class="hero">
      <div class="hero__content">
        <h1>Your&nbsp;Space. Their&nbsp;Convenience.</h1>
        <SearchForm />
        {/* <form class="hero__form">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Enter a zipcode"
          />
          <button type="submit">Find Spots</button>
        </form> */}
        {isLoading && <Loading />}
        {isError && <div className="capsule fail">{isError}</div>}
      </div>
    </div>
  );
}

export default Hero;
