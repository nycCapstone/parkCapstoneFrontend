import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useGetByPidAndTimeQuery } from "../../redux/client/searchApiSlice";
import { getCLSearchStatus } from "../../redux/client/clientSearchSlice";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { inputUserInfo } from "../../redux/checkout/checkoutSlice";
import { searchLandingMutate } from "../../redux/landing/landingSearchSlice";
import {
  updateInfoPrompt,
  resetInfoPrompt,
} from "../../redux/landing/changeTimeSlice";
import { useEffect, useState } from "react";
import { reservationData } from "../../constants/helper/helper";
import { useNavigate } from "react-router-dom";
import ReservationDetails from "./ReservationDetails";
import Reservation from "./Reservation";
import User from "./User";
import SmallSummary from "./Component/SmallSummary";
import EmptyResult from "./Component/EmptyResult";
import PSMapView from "../Location/PSMapView";
import SearchChangeTime from "../Spaces/Component/SearchChangeTime";
import Loading from "../../assets/Spinners/Loading";
import "./Styles/CheckoutLayout.css";

const Checkout = () => {
  const query = useSelector((state) => state.landing);
  const { property_id } = useParams();
  const { data: userData, isSuccess, isError } = useGetUserInfoQuery();

  const {
    data: checkoutData,
    error: checkoutError,
    refetch,
    isLoading,
  } = useGetByPidAndTimeQuery([
    property_id,
    query[query.length - 1][2],
    query[query.length - 1][3],
  ]);
  const [modalOpen, setModalOpen] = useState(true);
  const chTime = useSelector((state) => state.changeTime);
  const isL = useSelector(getCLSearchStatus);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
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
      if (property_id !== chTime.property_id) {
        dispatch(resetInfoPrompt());
      }
    } else if (checkoutData?.length === 0) {
      dispatch(
        updateInfoPrompt({
          property_id,
          infoPrompt: query[query.length - 1][3],
        }),
      );
      dispatch(searchLandingMutate());
    }
  }, [checkoutData]);

  if (checkoutData?.length > 0 && (isSuccess || isError)) {
    let lat;
    let lng;
    const resData = reservationData(checkoutData, query);
    if (resData[0]?.latitude && resData[0]?.longitude) {
      lat = resData[0].latitude;
      lng = resData[0].longitude;
    }
    return (
      <div>
        <div className="checkout-layout-container">
          <section className="ch1-gvjnv">
            <User userData={userData} />
          </section>
          <section className="ch2-gvjnv">
            <div className="reservePlusSummary">
              <SmallSummary checkoutData={checkoutData} />
              <Reservation resData={resData} />
            </div>

            <PSMapView
              lat={lat}
              lng={lng}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
            <section>
              <EmptyResult />
            </section>
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
  } else if (isLoading) {
    return (
      <div className="s-loading-container">
        <Loading />
      </div>
    );
  } else if (checkoutData?.length === 0 && (isSuccess || isError))
    return (
      <div>
        <div className="lus-chk-navigate">
          <button
            type="click"
            className="go-back-link"
            onClick={() =>
              navigate(`${isL ? "/client/search-result" : "/search-result"}`)
            }
          >
            <span className="go-back-icon">&#8678;</span>Back to Search Results
          </button>
        </div>
        <div className="lus-chk-navigate">
          <button type="click" className="go-back-link" onClick={openModal}>
            Change Time
          </button>
        </div>

        <SearchChangeTime isOpen={modalOpen} onClose={closeModal} />
      </div>
    );
  else return <div>Checkout Api Down</div>;
};

export default Checkout;
