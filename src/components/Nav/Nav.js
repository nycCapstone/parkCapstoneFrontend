import React from "react";
import { carvaletlogo } from "../../assets";
import { Link } from "react-router-dom";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";

import "./Nav.css";

function Nav() {
  const { data: userInfo, isLoading, isSuccess } = useGetUserInfoQuery();

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
    // <nav className="navbar">
    //   <div className="left-nav">
    //     <Link to="/">
    //       <img className="logo" src={carvaletlogo} alt="logo" />
    //     </Link>
    //   </div>
    //   <div className="right-nav">
    //     <div className="nav-links">
    //       <Link className="about" to="/about">
    //         About Us
    //       </Link>
    //       {isLoading && <p>Loading...</p>}
    //       {isSuccess && (
    //         <span className="greeting">Hi {userInfo.first_name}</span>
    //       )}
    //       {!isSuccess && !isLoading && (
    //         <>
    //           <Link className="log-in" to="/login">
    //             Log in
    //           </Link>
    //           <Link className="sign-up" to="/register">
    //             Sign up
    //           </Link>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </nav>
  );
}

export default Nav;
