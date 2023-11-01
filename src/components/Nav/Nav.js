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
          <Link to="/about">About Us</Link>
          <Link to="/login">Log in</Link>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

// import React from "react";
// import { carvaletlogo } from "../../assets";
// import { Link } from "react-router-dom";

// import "./Nav.css";

// function Nav() {
//   return (
//     <nav className="navbar">
//       <div className="right-nav">
//         <Link to="/">
//           <img className="logo" src={carvaletlogo} alt="logo" />
//         </Link>
//       </div>
//       <div className="left-nav">
//         <div className="nav-links">
//           <Link to="/about">About Us</Link>
//           <Link to="/login">Log in/Sign up</Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Nav;
