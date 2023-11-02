import React from "react";
import { Link } from "react-router-dom";
import MainImage from "./MainImage";
import {
  smilingadult,
  reservedforyou,
  parking_reserved,
  happycarcouple,
} from "../../assets";
import Overlay from "../../common/Overlay";

import "./Styles/Landing.css";

function Landing() {
  return (
    <>
      <Overlay>
        <header className="mainimage">
          <MainImage />
        </header>
        <div className="main_container">
          <section className="landing-intro">
            <h2>Welcome to CarValet</h2>
            <p>
              Find the perfect parking spot by neighborhood, borough, city, or
              zip code. Book your parking space with ease and convenience.
            </p>
          </section>
          <div className="landing-body">
            <section className="app-description back-color">
              <img
                src={reservedforyou}
                alt="Reserved for You"
                className="marketing-image"
              />
              <div className="pic-text">
                <h2>Your Parking Spot, Reserved Just for You</h2>
                <p>
                  Don't worry about finding a parking spot. We've got your
                  parking needs covered.
                </p>
                <button className="reserve-now">Reserve Now</button>
              </div>
            </section>

            <section className="app-description background-color">
              <div className="pic-text">
                <h2>Make extra money by renting your parking space</h2>
                <p>
                  Join our community of happy drivers and parking spot renters
                  who have found their perfect parking solution.
                </p>
                <button className="become-renter">Renter SignUp</button>
              </div>
              <img
                src={happycarcouple}
                alt="Happy Car Couple"
                className="marketing-image"
              />
            </section>
          </div>
        </div>
      </Overlay>
    </>
  );
}

export default Landing;
