import { useGetOneSpotQuery } from "../../redux/client/searchApiSlice";
import { useParams, Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchLoading from "../../assets/Spinners/SearchLoading";
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
    return (
      <div className="parking-spot-details-page">
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

        {spotDetails.renter_id && (
          <div>
            <h3>Renter Information</h3>
            <div className="details">
              <p className="detail-label">Renter ID:</p>
              <p className="detail-value">{spotDetails.renter_id}</p>
            </div>
            <div className="details">
              <p className="detail-label">First Name:</p>
              <p className="detail-value">{spotDetails.renter_first_name}</p>
            </div>
            <div className="details">
              <p className="detail-label">Last Name:</p>
              <p className="detail-value">{spotDetails.renter_last_name}</p>
            </div>
            <div className="details">
              <p className="detail-label">Email:</p>
              <p className="detail-value">{spotDetails.renter_email}</p>
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
    );
  }

  if (isLoading) {
    return <SearchLoading />;
  }

  if (error || isUninitialized) {
    if (error) return <div>Api Down</div>;
    return <Navigate to="/login" />;
  }
}

export default ParkingSpotDetailPage;
