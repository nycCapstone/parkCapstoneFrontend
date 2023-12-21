import { useGetOneSpotQuery } from "../../redux/client/searchApiSlice";
import { useNavigate, useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../assets/Spinners/Loading";
import PSMapView from "../Location/PSMapView";
import { RatingStars } from "../Location/RatingStars";
import { BiLinkExternal } from "react-icons/bi";
import "./Styles/SpotDetails.css";

function SpotDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const accessToken = useSelector((state) => state.auth.accessToken);
  const {
    data: responseData,
    isSuccess,
    error,
    isLoading,
    isUninitialized,
  } = useGetOneSpotQuery(id, { skip: !accessToken });

  const openGoogleMaps = () => {
    const address = encodeURIComponent(responseData[0].prop_address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`);
  };

  if (isSuccess) {
    const spotDetails = responseData[0];
    const lat = spotDetails.latitude;
    const lng = spotDetails.longitude;

    return (
      <div className="parking-spot-details-page">
        <div className="details-container">
          <div className="details-price-address">
            <div className="details-address">
              <p className="first-address">
                {spotDetails.prop_address.split(",")[0]}
              </p>
              <p className="second-address">{`${spotDetails.prop_address
                .split(",")
                .slice(1)}`}</p>
            </div>

            <p className="details-price">${spotDetails.price}</p>
          </div>
          <div className="details-second-info">
            <div className="details-single">
              <p className="details-label">Number of Spaces:</p>
              <p>{spotDetails.number_spaces}</p>
            </div>

            <div className="details-single">
              <p className="details-label">Billing Type:</p>
              <p>
                {spotDetails.billing_type[0].toUpperCase() +
                  spotDetails.billing_type.slice(1).toLowerCase()}{" "}
                / Daily
              </p>
            </div>

            <div className="details-single">
              <p className="details-label">Rating:</p>
              <RatingStars rating={spotDetails.rating || 5.0} />
            </div>

            {spotDetails.renter_email && (
              <div className="details-single">
                <p className="details-label">Spot Owner Name:</p>
                <p>
                  {spotDetails.first_name[0].toUpperCase() +
                    spotDetails.first_name.slice(1).toLowerCase()}
                </p>
              </div>
            )}
          </div>
          <div className="details-buttons">
            <button
              onClick={() => navigate(-1)}
              className="details-single-button"
            >
              Go back
            </button>
          </div>
        </div>
        <div className="details-map">
          <section className="ps-mapview">
            <PSMapView
              lat={lat}
              lng={lng}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            />
          </section>
          <div className="view-on-googleMap">
            <button className="google-maps-button" onClick={openGoogleMaps}>
              View on Google Map
            </button>
            <BiLinkExternal className="client-booking-icon" />{" "}
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="s-loading-container">
        <Loading />
      </div>
    );
  }

  if (error || isUninitialized) {
    return <Navigate to="/login" />;
  }
}

export default SpotDetails;
