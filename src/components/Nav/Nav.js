import React from "react";
import { carvaletlogo } from "../../assets";
import { Link } from "react-router-dom";

import "./Nav.css";

function Nav() {
  return (
    <nav className="navbar">
      <div className="left-nav">
        <Link to="/">
          <img className="logo" src={carvaletlogo} alt="logo" />
        </Link>
      </div>
      <div className="right-nav">
        <div className="nav-links">
          <Link className="about" to="/about">
            About Us
          </Link>
          <Link className="log-in" to="/login">
            Log in
          </Link>
          <Link className="sign-up" to="/register">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
