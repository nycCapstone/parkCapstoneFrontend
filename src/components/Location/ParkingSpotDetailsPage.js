import { useGetOneSpotQuery } from "../../redux/client/searchApiSlice";
import { useParams, Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import MapView from "../Maps/MapView";
import "./Details.css";

function ParkingSpotDetailPage() {
  const { id } = useParams();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const {
    data: responseData,
    isSuccess,
    error,
    isLoading,
    isUninitialized,
  } = useGetOneSpotQuery(id, { skip: !accessToken });

  if (isSuccess) {
    const spotDetails = responseData[0];
    const lat = spotDetails.latitude;
    const lng = spotDetails.longitude;

    return (
      <div className="parking-spot-details-page">
        <div className="details-container">
          {/* Details Information */}
          <h1>Parking Spot Details</h1>
          <div className="details">
            <p className="detail-label">Address:</p>
            <p className="detail-value">{spotDetails.prop_address}</p>
          </div>
          <div className="details">
            <p className="detail-label">Number of Spaces:</p>
            <p className="detail-value">{spotDetails.number_spaces}</p>
          </div>
          <div className="details">
            <p className="detail-label">Billing Type:</p>
            <p className="detail-value">{spotDetails.billing_type}</p>
          </div>
          <div className="details">
            <p className="detail-label">Owner ID:</p>
            <p className="detail-value">{spotDetails.space_owner_id}</p>
          </div>
          <div className="details">
            <p className="detail-label">Rating:</p>
            <p className="detail-value">{spotDetails.rating || 5.00}</p>
          </div>
          {spotDetails.renter_id && (
            <div>
              <h3>Renter Information</h3>
              <div className="details">
                <p className="detail-label">First Name:</p>
                <p className="detail-value">{spotDetails.client_first_name}</p>
              </div>
              <div className="details">
                <p className="detail-label">Last Name:</p>
                <p className="detail-value">{spotDetails.client_last_name}</p>
              </div>
              <div className="details">
                <p className="detail-label">Address:</p>
                <p className="detail-value">{spotDetails.renter_address}</p>
              </div>
            </div>
          )}
          <button className="book-now-button">Book Now</button>
          <Link to="/search-result" className="go-back-link">
            Go back to Search Results
          </Link>
        </div>

        <section className="ps-mapview">
          <MapView
            lat={lat}
            lng={lng}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            containerElement={<div style={{ height: `100%` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </section>
      </div>
    );
  }

  if (isLoading) {
    return <div className="s-loading-container"><SearchLoading /></div>;
  }

  if (error || isUninitialized) {
    if (error) return <div>Api Down</div>;
    return <Navigate to="/login" />;
  }
}

export default ParkingSpotDetailPage;
