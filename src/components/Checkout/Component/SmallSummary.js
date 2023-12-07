import { getSummaryInfo } from "../../../constants/reducers/checkout";
import "../Styles/SmallSummary.css";

const SmallSummary = ({ checkoutData }) => {
  const Summary = getSummaryInfo(checkoutData);
  return (
    <div className="ss-info-container">
      {Summary[0]?.property_id ? (
        <>
          <div className="ss-card">
            <p>{Summary[0].prop_address}</p>
            <p style={{ marginTop: "0.5rem" }}>
              Billing Type:{" "}
              {Summary[0].billing_type === "fixed" ? "pay per day" : "hourly"}
            </p>
          </div>
          {Summary[Summary.length - 1].picture && (
            <div className="ss-card">
              <img
                alt="ss-summary-pic"
                src={Summary[Summary.length - 1].picture}
              />
            </div>
          )}
          <div className="ss-card">
            Parking provided for:{" "}
            {Summary.some((item) => item.sp_type === "truck")
              ? "large and small vehicles"
              : "all commuters"}
          </div>
        </>
      ) : (
        <div className="no-summary">No Summary</div>
      )}
    </div>
  );
};

export default SmallSummary;
