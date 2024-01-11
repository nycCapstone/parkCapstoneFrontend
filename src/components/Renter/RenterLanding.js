import Earnings from "./Components/Earnings";
import { Link } from "react-router-dom";
import SoldSpaces from "./Components/SoldSpaces";
import { useSelector } from "react-redux";
import { FaChevronCircleLeft } from "react-icons/fa";
import "./Styles/Renter.css";

const RenterLanding = () => {
  const userRole = useSelector((state) => state.roles);

  return (
    <div className="renter-container">
      <div className="status-container">
        {userRole?.ClientOnly ? (
          <div className="renter-landing-divert">
            <h3>Register as Renter</h3>
            <Link to="/register">Sign Up</Link>
          </div>
        ) : (
          <div className="renter-dashboard">
            <div className="ctr-nav-r-links">
              <div className="cl-h-svgleft">
                <Link to="/admin">
                  <FaChevronCircleLeft style={{ color: "#551A8B" }} />
                </Link>
              </div>
            </div>
            <SoldSpaces />
          </div>
        )}
      </div>
    </div>
  );
};

export default RenterLanding;
