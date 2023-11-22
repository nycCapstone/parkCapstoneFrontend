import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetLandingCache } from "../../../redux/landing/landingSearchSlice";
import { useNewClientPmtMutation } from "../../../redux/checkout/checkoutApiSlice";
import "./Payment.css";

const Payment = () => {
  //reservation information
  //selected_space {}
  //query_data
  //Array[] space_id, final_price, check_in time, check_out time
  const resInfo = useSelector((state) => state.reservation);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [err, setErr] = useState(false);
  const [newClientPmt] = useNewClientPmtMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if ([cardNumber, expiryDate, cvv, nameOnCard].some((item) => item === "")) {
      return;
    }
    await newClientPmt({ data: [expiryDate, resInfo.booking_id] })
      .unwrap()
      .then((res) => {
        if (!res.success) {
          setErr(true);
          return;
        }
        dispatch(resetLandingCache());
        navigate(`/client/pmt/success/${resInfo.nav_id}/${res.pmt_id}`);
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="payment-container">
      <h2 className="billing-header">Billing Information</h2>
      <div className="purchase-details">
        <div>{err && <div className="error-message">Error</div>}</div>
        {/* Display details related to the item being purchased */}
        <p className="price">
          <span className="category-price">Price:</span> $
          {resInfo.selected_space.final_price}
        </p>
        <p className="location">
          <span className="category-location">Parking Location:</span>{" "}
          {resInfo.selected_space.prop_address.slice(0, -5)}
        </p>
        <p className="space-number">
          <span className="category-space-number">Space No:</span>{" "}
          {resInfo.query_data[0].find(item => item.space_id === resInfo.booking_space_id)?.space_no}
        </p>
      </div>

      {/* Payment form */}
      <form className="payment-form" onSubmit={handlePaymentSubmit}>
        <label>
          <span className="label-card-name">Name on Card</span>
          <br />
          <input
            type="text"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
          />
        </label>
        <label>
          <span className="label-card-num">Card Number</span>
          <br />
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </label>
        <label>
          <span className="label-card-exp">Expiration Date</span>
          <br />
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </label>

        <label>
          <span className="label-card-cvv">CVV (security code)</span>
          <br />
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </label>
        <br />
        <button className="payment-button" type="submit">
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default Payment;
