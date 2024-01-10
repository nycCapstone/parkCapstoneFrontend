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
            <nav className="centered-nav">
              <div className="ctr-nav-r-links">
                <div className="cl-h-svgleft">
                  <Link to="/admin">
                    <FaChevronCircleLeft style={{ color: "purple" }} />
                  </Link>
                </div>
                <Link to="/renter/manage">Add Properties</Link>
                <Link to="/renter/space-activity">Your Current Activity</Link>
                <div className="earnings-total-container">
                  <Earnings />
                </div>
              </div>
            </nav>
            <div>
              <SoldSpaces />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenterLanding;
