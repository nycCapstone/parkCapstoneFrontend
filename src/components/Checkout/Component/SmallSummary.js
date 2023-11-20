import { getSummaryInfo } from "../../../constants/reducers/checkout";
import "../Styles/SmallSummary.css"

const SmallSummary = ({ checkoutData }) => {
  const Summary = getSummaryInfo(checkoutData);
  return (
    <div
      className="ss-card"
    >
      {Summary[0]?.property_id ? (
        <div className="ss-card-header">
          <p>{Summary[0].prop_address}</p>
          <p>{Summary[0].billing_type}</p>
          <div className="summary-pic">
            {Summary[Summary.length - 1].picture && (
              <img
                alt="ss-summary-pic"
                src={Summary[Summary.length - 1].picture}
              />
            )}
          </div>
          <div className="ss-card-footer">
            Parking provided for:{" "}
            {Summary.some((item) => item.sp_type === "truck")
              ? "large and small vehicles"
              : "all commuters"}
          </div>
        </div>
      ) : (
        <div className="no-summary">No Summary</div>
      )}
    </div>
  );
};

export default SmallSummary;
