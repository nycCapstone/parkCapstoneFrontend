import useClosestCity from "../../hooks/useClosestCity";
import { useSelector } from "react-redux";
import { getLanSearchStatus } from "../../redux/landing/landingSearchSlice";
import { useState } from "react";
import NavInfo from "./NavInfo";
import OnLoadNav from "./OnLoadNav";
import { logo_final } from "../../assets";
import { Link } from "react-router-dom";
import { CgMenu } from "react-icons/cg";
import { CgCloseR } from "react-icons/cg";
import useLogout from "../../hooks/useLogout";
import { FaLocationCrosshairs } from "react-icons/fa6";
import "./Nav.css";

function Nav() {
  const userStatus = useSelector((state) => state.roles?.Client);
  const [showMenu, setShowMenu] = useState(false);
  const clientLocation = useClosestCity();

  const logout = useLogout();

  const searchStatus = useSelector(getLanSearchStatus);

  const signOut = async () => {
    await logout();
  };

  return (
    <nav className={showMenu ? "navbar active" : "navbar"}>
      <div className="left-nav">
        <Link to="/">
          <img className="logo" src={logo_final} alt="logo" />
        </Link>
        {clientLocation ? (
          <div className="client-location">
            <div style={{ display: "flex" }}>
              <FaLocationCrosshairs />
              {clientLocation}
            </div>
          </div>
        ) : (
          <div className="client-location">Turn on Location</div>
        )}
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
          <OnLoadNav />
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
