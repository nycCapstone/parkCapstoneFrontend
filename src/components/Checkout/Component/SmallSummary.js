import { getSummaryInfo } from "../../../constants/reducers/checkout";

const SmallSummary = ({ checkoutData }) => {
  const Summary = getSummaryInfo(checkoutData);
  return (
    <div
      className="reservation-summary"
      style={{ backgroundColor: "lightgray" }}
    >
      {Summary[0]?.property_id ? (
        <div>
          <p>{Summary[0].prop_address}</p>
          <p>{Summary[0].billing_type}</p>
          <div className="summary-pic">
            {Summary[Summary.length - 1].picture && (
              <img
                alt="summary-pic"
                src={Summary[Summary.length - 1].picture}
              />
            )}
          </div>
          <div>
            Parking provided for:{" "}
            {Summary.some((item) => item.sp_type === "truck")
              ? "large and small vehicles"
              : "all commuters"}
          </div>
        </div>
      ) : (
        <div>No Summary</div>
      )}
    </div>
  );
};

export default SmallSummary;
