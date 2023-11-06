import React from "react";
import { carvaletlogo } from "../../assets";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Nav.css";

function Nav() {
  const userStatus = useSelector((state) => state.auth.accessToken);

  return (
    <nav className="navbar">
      <div className="left-nav">
        <Link to="/">
          <img className="logo" src={carvaletlogo} alt="logo" />
        </Link>
      </div>
      <div className="right-nav">
        <div className="nav-links" >
          <Link className="about" to="/about">
            About Us
          </Link>
          {!userStatus ? (
            <Link className="log-in" to="/login">
              Login
            </Link>
          ) : (
            <Link className="log-in" to="/home">
              profile page
            </Link>
          )}

          <Link className="sign-up" to="/register">
            Sign up
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
