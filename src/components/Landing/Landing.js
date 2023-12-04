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
    <div className="landing">
      <Overlay>
        <Hero />

        <section className="landing-intro">
          <div className="container">
            <h2>Welcome to CarValet</h2>
            <div className="landing-content-description">
              Find the perfect parking spot by neighborhood, borough, city, or
              zip code. Book your parking space with ease and convenience.
            </div>
          </div>
        </section>
        <div className="landing-body">
          <section className="app-description">
            <div className="container">
              <img
                src={reservedforyou}
                alt="Reserved for You"
                className="marketing-image"
              />
              <div className="pic-text">
                <h2>Your Parking Spot, Reserved Just for You</h2>
                <div className="landing-content-description">
                  Don't worry about finding a parking spot. We've got your
                  parking needs covered.
                </div>
                <Link className="client" to="/client">
                  <button className="reserve-now">Reserve Now</button>
                </Link>
              </div>
            </div>
          </section>

          <section className="app-description">
            <div className="container">
              <img
                src={happycarcouple}
                alt="Happy Car Couple"
                className="marketing-image"
              />
              <div className="pic-text">
                <h2>Make extra money by renting your parking space</h2>
                <div className="landing-content-description">
                  Join our community of happy drivers and parking spot renters
                  who have found their perfect parking solution.
                </div>
                <Link className="sign-up" to="/register">
                  <button className="become-renter">Renter SignUp</button>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </Overlay>
    </div>
  );
}

export default Landing;
