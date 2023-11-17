import React from "react";
import { carvaletlogo, appLogo, ori_logo } from "../../assets";
import NavInfo from "./NavInfo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";
import { CgMenu } from "react-icons/cg";
import { CgCloseR } from "react-icons/cg";
import { useState } from "react";
import "./Nav.css";

function Nav() {
  const userStatus = useSelector((state) => state.roles?.Client);
  const [showMenu, setShowMenu] = useState(false);

  const logout = useLogout();

  const signOut = async () => {
    await logout();
  };

  return (
    <nav className={showMenu ? "navbar active" : "navbar"}>
      <div className="left-nav">
        <Link to="/">
          <img className="logo" src={ori_logo} alt="logo" />
        </Link>
      </div>
      <div className="right-nav">
        {userStatus ? (
          <div className="nav-links">
            <Link className="about" to="/about">
              About Us
            </Link>
            <NavInfo />
            <Link className="sign-up" onClick={signOut}>
              Sign Out
            </Link>
          </div>
        ) : (
          <div className="nav-links">
            <Link className="about" to="/about">
              About Us
            </Link>
            <Link className="log-in" to="/login">
              Login
            </Link>
            <Link className="sign-up" to="/register">
              Sign Up
            </Link>
          </div>
        )}

        <div className="mobile-navbar-btn">
          <CgMenu
            name="menu-outline"
            className="mobile-nav-icon"
            onClick={() => setShowMenu(true)}
          />
          <CgCloseR
            name="close-outline"
            className="close-outline mobile-nav-icon"
            onClick={() => setShowMenu(false)}
          />
        </div>
      </div>
    </nav>
  );
}

export default Nav;
