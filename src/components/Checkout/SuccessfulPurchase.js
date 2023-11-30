import { useGetClientTransactionsQuery } from "../../redux/checkout/checkoutApiSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resetRInfoCache } from "../../redux/checkout/reservationSlice";
import { resetSearchState } from "../../redux/search/searchResultsSlice";
import { resetBookings } from "../../redux/client/clientSearchSlice";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import SearchLoading from "../../assets/Spinners/SearchLoading";
// import PSMapView from "./PSMapView";
import { Link } from "react-router-dom";
import "./Styles/SuccessfulPurchase.css";

const SuccessfulPurchase = () => {
  const { data: userInfo } = useGetUserInfoQuery();
  const { nav_id, pmt_id } = useParams();
  const resInfo = useSelector((state) => state.reservation);
  const dispatch = useDispatch();
  const {
    data: activity,
    isSuccess,
    isLoading,
    error,
    isUninitialized,
  } = useGetClientTransactionsQuery({}, { refetchOnMountOrArgChange: true });

  const [toast, setToast] = useState(null);
  const [reservationInfo, setReservationInfo] = useState({});

  useEffect(() => {
    if (resInfo?.nav_id === nav_id && pmt_id) {
      //erase most recent reservation details
      setReservationInfo(resInfo);
      dispatch(resetRInfoCache());
      dispatch(resetSearchState());
      dispatch(resetBookings());
      setToast(true);
    }
  }, []);

  if (isLoading || isUninitialized) {
    return <SearchLoading />;
  }

  if (isSuccess) {
    return (
      <div className="successful-purchase-container">
        {activity && toast ? (
          <>
            <h2 className="success-message">
              Congratulations, {userInfo.first_name}! Your reservation is
              confirmed!
            </h2>
            {/* <h3>{JSON.stringify(reservationInfo)}</h3> */}
            <div className="payment-list">
              <div className="newest-transactions">
                <div className="box">
                  <div className="success alert">
                    <div className="alert-body">
                      {activity?.find((item) => item.pmt_id === pmt_id) &&
                        "Successfully paid"}
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="success-map">
                <section className="ps-mapview">
                  <PSMapView
                    lat={lat}
                    lng={lng}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </section>
              </div> */}
              <div className="payment-details">
                <p>
                  <span className="conf-details">
                    Your Payment ID is{" "}
                    <span className="pymt-id">{activity[0].pmt_id}</span>
                  </span>
                </p>
                <br />
                <p>
                  <span className="conf-details">
                    Your reservation at{" "}
                    {reservationInfo.selected_space.prop_address} from{" "}
                    {new Date(reservationInfo.query_data[2]).toLocaleTimeString(
                      undefined,
                      {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }
                    )}{" "}
                    on{" "}
                    {new Date(
                      reservationInfo.query_data[2]
                    ).toLocaleDateString()}{" "}
                    to{" "}
                    {new Date(reservationInfo.query_data[3]).toLocaleTimeString(
                      undefined,
                      {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      }
                    )}{" "}
                    on{" "}
                    {new Date(
                      reservationInfo.query_data[3]
                    ).toLocaleDateString()}{" "}
                    is all set!
                  </span>
                </p>
                <br />
                <p>
                  <span className="conf-details">
                    {" "}
                    Your reservation total is $
                    {reservationInfo.selected_space.final_price}
                  </span>
                </p>
              </div>
            </div>
            <div className="record-message">
              <p>Please print out this page for your records!</p>
            </div>
          </>
        ) : (
          <div className="no-activity">No Data Yet</div>
        )}
        <Link to="/admin" className="admin-link">
          Administrator Page
        </Link>
      </div>
    );
  }

  if (error) {
    return <div className="api-down-message">API Down</div>;
  }
};

export default SuccessfulPurchase;
