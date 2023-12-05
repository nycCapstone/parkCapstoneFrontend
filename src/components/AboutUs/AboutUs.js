import React from "react";
import jibonImage from "../../assets/paul.jpg";
import zalmanImage from "../../assets/zalman.jpeg";
import daveImage from "../../assets/dave.jpeg";
import karmaImage from "../../assets/karma.jpeg";
import YasserImage from "../../assets/yasser.jpeg";

import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>
        Welcome to CarValet! Our platform is designed to simplify and streamline
        the parking experience for both drivers and property owners. Whether
        you're a commuter seeking a convenient spot or a property owner with
        available parking spaces, we've got you covered.
      </p>
      <p>
        Our mission is to revolutionize the way people think about parking,
        making it hassle-free, accessible, and community-driven. We believe
        everyone should have easy access to secure parking, and our app is here
        to make that vision a reality.
      </p>
      <h2>How It Works</h2>
      <p>
        For Drivers: Simply search for available parking spaces in your desired
        location, compare prices and amenities, and book the perfect spot.
      </p>
      <p>
        For Property Owners: List your available parking spaces, set your
        preferences, and start earning by providing parking solutions to those
        in need.
      </p>
      <h2>Meet the Team</h2>
      <div className="team">
        <div className="team-member">
          <div className="team-member-inner">
            <div className="team-member-front">
              <h3>Jibon</h3>
              <img src={jibonImage} alt="Jibon" />
              <p>Full-stack Developer</p>
            </div>
            <div className="team-member-back">
              <h3>Jibon</h3>
              <p>Full-stack Developer</p>
              <p>Skillset: React, Node.js, MongoDB</p>
              <p>Email: jibonpaul@gmail.com</p>
              <p>
                GitHub:{" "}
                <a
                  href="https://github.com/JibonP"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  jibon
                </a>
              </p>
              <p>
                LinkedIn:{" "}
                <a
                  href="https://www.linkedin.com/in/jibon-paul-a223a715a"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Jibon
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="team">
          <div className="team-member">
            <div className="team-member-inner">
              <div className="team-member-front">
                <h3>Zalman</h3>
                <img src={zalmanImage} alt="Zalman" />
                <p>Full-stack Developer</p>
              </div>
              <div className="team-member-back">
                <h3>Zalman</h3>
                <p>Full-stack Developer</p>
                <p>Skillset: React, Node.js, Express</p>
                <p>Email: zalmanazimov@pursuit.org</p>
                <p>
                  GitHub:{" "}
                  <a
                    href="https://github.com/zalazimov"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    zalman
                  </a>
                </p>
                <p>
                  LinkedIn:{" "}
                  <a
                    href="https://www.linkedin.com/in/zalmana/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Zalman
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="team">
          <div className="team-member">
            <div className="team-member-inner">
              <div className="team-member-front">
                <h3>Dave</h3>
                <img src={daveImage} alt="Dave" />
                <p>Full-stack Developer</p>
              </div>
              <div className="team-member-back">
                <h3>Dave</h3>
                <p>Full-stack Developer</p>
                <p>Skillset: React, Node.js, Express</p>
                <p>Email: davidpaquette@pursuit.org</p>
                <p>
                  GitHub:{" "}
                  <a
                    href="https://github.com/DaveP80"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dave
                  </a>
                </p>
                <p>
                  LinkedIn:{" "}
                  <a
                    href="https://www.linkedin.com/in/david-paquette-334225b3/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Dave
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="team">
          <div className="team-member">
            <div className="team-member-inner">
              <div className="team-member-front">
                <h3>Karma</h3>
                <img src={karmaImage} alt="Karma" />
                <p>Full-stack Developer</p>
              </div>
              <div className="team-member-back">
                <h3>Karma</h3>
                <p>Full-stack Developer</p>
                <p>Skillset: React, Node.js, Express</p>
                <p>Email: karmaghale@pursuit.org</p>
                <p>
                  GitHub:{" "}
                  <a
                    href="https://github.com/KarmaG-7"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Karma
                  </a>
                </p>
                <p>
                  LinkedIn:{" "}
                  <a
                    href="https://www.linkedin.com/in/karma-ghale-8583a81b9/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Karma
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="team">
          <div className="team-member">
            <div className="team-member-inner">
              <div className="team-member-front">
                <h3>Yasser</h3>
                <img src={YasserImage} alt="Karma" />
                <p>Full-stack Developer</p>
              </div>
              <div className="team-member-back">
                <h3>Yasser</h3>
                <p>Full-stack Developer</p>
                <p>Skillset: React, Node.js, Express</p>
                <p>Email: yassersaadi@pursuit.org</p>
                <p>
                  GitHub:{" "}
                  <a
                    href="https://github.com/YasserS-21"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Yasser
                  </a>
                </p>
                <p>
                  LinkedIn:{" "}
                  <a
                    href="https://www.linkedin.com/in/yasser-saadi/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Yasser
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
