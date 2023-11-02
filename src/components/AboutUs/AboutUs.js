import React from "react";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-us">
      <h1>About Us</h1>
      <p>
        Welcome to our parking app! We provide a platform where users can rent
        parking spots and offer their empty spaces to those in need of
        convenient parking solutions.
      </p>
      <p>
        Our mission is to make parking hassle-free and accessible to everyone,
        whether you're a driver looking for a spot or a property owner with an
        empty space to share.
      </p>
      <h2>Meet the Team</h2>
      <div className="team">
        <div className="team-member">
          {/* <img src="jibon.jpg" alt="Jibon" /> */}
          <h3>Jibon</h3>
          <p>Full-stack Developer</p>
        </div>
        <div className="team-member">
          {/* <img src="zalman.jpg" alt="Zalman" /> */}
          <h3>Zalman</h3>
          <p>Full-stack Developer</p>
        </div>
        <div className="team-member">
          {/* <img src="dave.jpg" alt="Dave" /> */}
          <h3>Dave</h3>
          <p>Full-stack Developer</p>
        </div>
        <div className="team-member">
          {/* <img src="karma.jpg" alt="Karma" /> */}
          <h3>Karma</h3>
          <p>Full-stack Developer</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
