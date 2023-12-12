import React from "react";
import SearchForm from "../Forms/SearchForm";
import { useSelector } from "react-redux";
import Loading from "../../assets/Spinners/Loading";
import "./Styles/Hero.css";

function Hero() {
  const isLoading = useSelector((state) => state.searchResults.loading);
  const isError = useSelector((state) => state.searchResults.error);
  return (
    <div className="hero">
      <div className="hero__content">
        <h1 className="hero_slogan">
          Your&nbsp;Space. Their&nbsp;Convenience.
        </h1>
        <SearchForm />
        {isLoading && <Loading />}
        {isError && <div className="capsule">{isError}</div>}
      </div>
    </div>
  );
}

export default Hero;
