import { getSummaryInfo } from "../../../constants/reducers/checkout";
import { FaLocationDot } from "react-icons/fa6";
import "../Styles/SmallSummary.css";

const SmallSummary = ({ checkoutData }) => {
  const Summary = getSummaryInfo(checkoutData);
  console.log(Summary);
  return (
    <div>
      {/* <p className="reservation-summary-header">Reservation Summary</p> */}
      <div className="ss-info-container">
        {Summary[0]?.property_id ? (
          <>
            <FaLocationDot className="checkout-location-icon" />
            <div className="checkout-price-address">
              <div className="checkout-address">
                <p className="checkout-first-address">
                  {Summary[0].prop_address.split(",")[0]}
                </p>
                <p className="checkout-second-address">{`${Summary[0].prop_address
                  .split(",")
                  .slice(1)}`}</p>
              </div>
              <div className="checkoutPage-parkingSpot">
                <label className="checkout-parkingSpot-label">Spot</label>
                <p className="checkout-parkingSpot-num">
                  {Summary[0].space_no}
                </p>
              </div>
            </div>
            {/* <div className="ss-card">
              <p>
                <strong>{Summary[0].prop_address}</strong>
              </p>
              <p className="billing-type">
                Billing Type:{" "}
                {Summary[0].billing_type === "fixed" ? "pay per day" : "hourly"}
              </p>
            </div> */}
            {Summary[Summary.length - 1].picture && (
              <div className="ss-card">
                <img
                  alt="ss-summary-pic"
                  src={Summary[Summary.length - 1].picture}
                />
              </div>
            )}
            {/* <div className="ss-card">
              Parking provided for:{" "}
              {Summary.some((item) => item.sp_type === "truck")
                ? "large and small vehicles"
                : "all commuters"}
            </div> */}
          </>
        ) : (
          <div className="no-summary">No Summary</div>
        )}
      </div>
    </div>
  );
};

export default SmallSummary;
