import { Link } from "react-router-dom";
import SoldSpaces from "./Components/SoldSpaces";
import { useSelector } from "react-redux";

const RenterLanding = () => {
  const userRole = useSelector((state) => state.roles);

  return (
    <div className="renter-container">
      <div className="status-container">
        {userRole?.ClientOnly ? (
          <div>
            <h3>Register as Renter</h3>
            <Link to="/register">Sign Up</Link>
          </div>
        ) : (
          <div className="renter-dashboard">
            <nav className="centered-nav">
              <div>
                <Link to="/renter/manage">Add Properties</Link>
                <Link to="/renter/space-activity">Your Current Activity</Link>
              </div>
            </nav>
            <main>
              <SoldSpaces />
            </main>
          </div>
        )}
      </div>
    </div>
  );
};

export default RenterLanding;
