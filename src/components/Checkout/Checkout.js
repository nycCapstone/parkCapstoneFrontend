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
import SearchLoading from "../../assets/Spinners/SearchLoading";
import "./Styles/CheckoutLayout.css"

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
        })
      );
    } else if (checkoutData?.length === 0) {
      setInfoPrompt(query[query.length - 1][3]);
      dispatch(searchLandingMutate());
    }
  }, [checkoutData]);

  if ((isSuccess || isUninitialized) && checkoutData?.length > 0) {
    const resData = reservationData(checkoutData, query);
    return (
      <div className="checkout-layout-container">
        <section>
          <User userData={userData} />
        </section>
        <section>
          <SmallSummary checkoutData={checkoutData} />
          <Reservation resData={resData} />
        <section>
          <EmptyResult infoPrompt={infoPrompt} />
        </section>
        </section>
        <section>
          <ReservationDetails userData={userData} resData={resData} />
        </section>
      </div>
    );
  } else if (error || checkoutError) {
    return <div>Checkout Api down</div>;
  } else return <SearchLoading />;
};

export default Checkout;
