import React from "react";
import { Link } from "react-router-dom";
import MainImage from "./MainImage";
import { smilingadult, reservedforyou, happycarcouple } from "../../assets";
import Overlay from "../../common/Overlay";
import "./Landing.css";

function Landing() {
  return (
    <>
      <Overlay>
        <header className="mainimage">
          <MainImage />
        </header>
        <div className="main_container">
          <header className="hero"></header>

          <section className="app-description">
            <h2>Welcome to CarValet</h2>
            <p>
              Find the perfect parking spot by neighborhood, borough, city, or
              zip code. Book your parking space with ease and convenience.
            </p>
          </section>

          <section className="app-description">
            <img
              src={reservedforyou}
              alt="Reserved for You"
              className="marketing-image"
            />
            <h2>Your Parking Spot, Reserved Just for You</h2>
            <p>
              Don't worry about finding a parking spot. We've got your parking
              needs covered.
            </p>
          </section>

          <section className="app-description">
            <img
              src={happycarcouple}
              alt="Happy Car Couple"
              className="marketing-image"
            />
            <h2>Make extra money by renting your parking space</h2>
            <p>
              Join our community of happy drivers and parking spot renters who
              have found their perfect parking solution.
            </p>
          </section>

          <footer>
            <div className="about-us-links">
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact Us</Link>
              <Link to="/terms">Terms & Conditions</Link>
            </div>
          </footer>
        </div>
      </Overlay>
    </>
  );
}

export default Landing;
