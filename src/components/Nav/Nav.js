import React from "react";
import { carvaletlogo } from "../../assets";
import NavInfo from "./NavInfo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";

import "./Nav.css";

function Nav() {
  const userStatus = useSelector((state) => state.roles?.Client);

  const logout = useLogout();

  const signOut = async () => {
    await logout();
  };

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
          {userStatus ? (
            <>
              <NavInfo />
              <Link className="sign-up" onClick={signOut}>
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link className="log-in" to="/login">
                Login
              </Link>
              <Link className="sign-up" to="/register">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Nav;
