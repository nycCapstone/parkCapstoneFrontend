import { useGetClientTransactionsQuery } from "../../redux/checkout/checkoutApiSlice";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { resetRInfoCache } from "../../redux/checkout/reservationSlice";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import Loading from "../../assets/Spinners/Loading";
import PSMapView from "../Location/PSMapViewSuccess";
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
  } = useGetClientTransactionsQuery(resInfo?.booking_id, {
    refetchOnMountOrArgChange: false,
  });

  const [toast, setToast] = useState(null);
  const [reservationInfo, setReservationInfo] = useState({});
  console.log(activity)

  useEffect(() => {
    if (resInfo?.nav_id === nav_id && pmt_id) {
      //erase most recent reservation details
      setReservationInfo(resInfo);
      dispatch(resetRInfoCache());
      setToast(true);
    }
  }, []);

  if (isLoading || isUninitialized) {
    return (
      <div className="s-loading-container">
        <Loading />
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="successful-purchase-container">

        {activity && toast ? (
          <>
          <div className="sucessful-box">
            <h2 className="success-message">
              Congratulations {userInfo.first_name}!
            </h2>
            <div className="newest-transactions">
              <div className="box">
                <div className="success alert">
                </div>
                <div className="alert-body">
                    Your reservation is confirmed!
                </div>

              </div>
            </div>
            </div>
            <div className= "successful-payment-container">
            <div className="successful-payment-header">
            <h3>Confirmation Number</h3>
            <span className="pymt-id">{activity[0].pmt_id}</span>
            </div>
            <div className="success-payment-list">
              <div className="success-map">
                <h3>Location</h3>
                <section className="ps-mapview">
                  <PSMapView
                    lat={reservationInfo.lat}
                    lng={reservationInfo.lng}
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                    containerElement={<div style={{ height: `100%` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                </section>
                    <br />
                    {reservationInfo.selected_space.prop_address.slice(0, -5)}
              </div>

              <div className="payment-details">
                <ul className="success-conf-details-list">
                  <li className="conf-check-in">
                    <span className="conf-check-in-date-time">Check-in</span>{" "}
                    {new Date(
                      reservationInfo.query_data[2],
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(reservationInfo.query_data[2]).toLocaleTimeString(
                      undefined,
                      {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      },
                    )}
                  </li>
                  <br />
                  <li className="conf-checkout">
                    <span className="conf-check-out-date-time">Checkout</span>{" "}
                    {new Date(
                      reservationInfo.query_data[3],
                    ).toLocaleDateString()}{" "}
                    -{" "}
                    {new Date(reservationInfo.query_data[3]).toLocaleTimeString(
                      undefined,
                      {
                        hour: "numeric",
                        minute: "numeric",
                        hour12: true,
                      },
                    )}
                  </li>
                  <br />
                  <li className="conf-price">
                    <span className="conf-details-total-price">Total Paid</span>
                    ${reservationInfo.selected_space.final_price}
                  </li>
                </ul>
              </div>
              
            </div>
            <div className="record-message">
              Please print out this page for your records!
            </div>
            </div>
          </>
        ) : (
          <div className="no-activity">No Data Yet</div>
        )}
        <Link to="/" className="link-to-home">
          <button className="admin-link">
          Book Another Spot!
          </button>
        </Link>
      </div>
    );
  }

  if (error) {
    return <div className="api-down-message">API Down</div>;
  }
};

export default SuccessfulPurchase;
