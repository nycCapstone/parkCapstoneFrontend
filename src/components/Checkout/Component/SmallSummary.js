import { getSummaryInfo } from "../../../constants/reducers/checkout";
import { FaLocationDot } from "react-icons/fa6";
import "../Styles/SmallSummary.css";

const SmallSummary = ({ checkoutData }) => {
  const Summary = getSummaryInfo(checkoutData);
  return (
    <div>
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
                <label className="checkout-parkingSpot-label">Avail.</label>
                <p className="checkout-parkingSpot-num">
                  {checkoutData.length}
                </p>
              </div>
            </div>

            {Summary[Summary.length - 1].picture && (
              <div className="ss-card">
                <img
                  alt="ss-summary-pic"
                  src={Summary[Summary.length - 1].picture}
                />
              </div>
            )}
          </>
        ) : (
          <div className="no-summary">No Summary</div>
        )}
      </div>
    </div>
  );
};

export default SmallSummary;
