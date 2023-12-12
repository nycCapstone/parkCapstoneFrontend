import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useGetByPidAndTimeQuery } from "../../redux/client/searchApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { inputUserInfo } from "../../redux/checkout/checkoutSlice";
import { searchLandingMutate } from "../../redux/landing/landingSearchSlice";
import { useEffect, useState } from "react";
import { reservationData } from "../../constants/helper/helper";
import ReservationDetails from "./ReservationDetails";
import Reservation from "./Reservation";
import User from "./User";
import SmallSummary from "./Component/SmallSummary";
import EmptyResult from "./Component/EmptyResult";
import PSMapView from "../Location/PSMapView";
import SearchLoading from "../../assets/Spinners/SearchLoading";
import "./Styles/CheckoutLayout.css";

const Checkout = () => {
  const role = useSelector((state) => !state.roles.hasOwnProperty("Client"));
  const query = useSelector((state) => state.landing);
  const [infoPrompt, setInfoPrompt] = useState(null);
  const { property_id } = useParams();
  const {
    data: userData,
    isSuccess,
    error,
    isUninitialized,
  } = useGetUserInfoQuery({}, { skip: role });

  const {
    data: checkoutData,
    error: checkoutError,
    refetch,
  } = useGetByPidAndTimeQuery([
    property_id,
    query[query.length - 1][2],
    query[query.length - 1][3],
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (checkoutData?.length > 0) {
      //checkout data
      dispatch(
        inputUserInfo({
          property_id,
          user_id: userData?.id || null,
          query: query,
          conflict: checkoutData[0]?.owner_id === userData?.id,
        }),
      );
    } else if (checkoutData?.length === 0) {
      setInfoPrompt(query[query.length - 1][3]);
      dispatch(searchLandingMutate());
    }
  }, [checkoutData]);

  if ((isSuccess || isUninitialized) && checkoutData?.length > 0) {
    let lat;
    let lng;
    const resData = reservationData(checkoutData, query);
    if (resData[0]?.latitude && resData[0]?.longitude) {
      lat = resData[0].latitude;
      lng = resData[0].longitude;
    }
    return (
      <div>
        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout-layout-container">
          <section className="ch1-gvjnv">
            <User userData={userData} />
          </section>
          <section className="ch2-gvjnv">
            <Reservation resData={resData} />
            <SmallSummary checkoutData={checkoutData} />

            <section style={{ display: infoPrompt ? "block" : "none" }}>
              <EmptyResult infoPrompt={infoPrompt} />
            </section>
          </section>
          <section className="ch-mapview">
            <PSMapView
              lat={lat}
              lng={lng}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </section>

          <section>
            <ReservationDetails
              userData={userData}
              resData={resData}
              checkoutData={checkoutData}
              refetch={refetch}
            />
          </section>
        </div>
      </div>
    );
  } else if (error || checkoutError) {
    return <div>Checkout Api down</div>;
  } else
    return (
      <div className="s-loading-container">
        <SearchLoading />
      </div>
    );
};

export default Checkout;
