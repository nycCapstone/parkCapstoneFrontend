import Hero from "./Hero";
import {
  smilingadult,
  reservedforyou,
  parking_reserved,
  happycarcouple,
} from "../../assets";
import { Link } from "react-router-dom";
import Overlay from "../../common/Overlay";

import "./Styles/Landing.css";

function Landing() {
  return (
    <div>
      <Overlay>
        <Hero />
        <div className="main_container">
          <section className="landing-intro">
            <h2>Welcome to CarValet</h2>
            <p>
              Find the perfect parking spot by neighborhood, borough, city, or
              zip code. Book your parking space with ease and convenience.
            </p>
          </section>
          <div className="landing-body">
            <section className="app-description">
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
                <Link className="client" to="/client">
                  <button className="reserve-now">Reserve Now</button>
                </Link>
              </div>
            </section>

            <section className="app-description">
              <img
                src={happycarcouple}
                alt="Happy Car Couple"
                className="marketing-image"
              />
              <div className="pic-text">
                <h2>Make extra money by renting your parking space</h2>
                <p>
                  Join our community of happy drivers and parking spot renters
                  who have found their perfect parking solution.
                </p>
                <Link className="sign-up" to="/register">
                  <button className="become-renter">Renter SignUp</button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </Overlay>
    </div>
  );
}

export default Landing;
