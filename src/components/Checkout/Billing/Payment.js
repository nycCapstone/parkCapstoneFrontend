import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { resetLandingCache } from "../../../redux/landing/landingSearchSlice";

const Payment = () => {
  //reservation information
  //selected_space {}
  //query_data
  //Array[] space_id, final_price, check_in time, check_out time
  const resInfo = useSelector((state) => state.reservation);
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    dispatch(resetLandingCache());
  };

  return (
    <div>
      <h2>Checkout</h2>
      <div>
        {/* Display details related to the item being purchased */}
        <p>Price: ${resInfo.selected_space.final_price}</p>
        <p>Location of your space: {resInfo.selected_space.prop_address}</p>
        <p>postal_code: {resInfo.selected_space.zip}</p>
        <p>Space No: {resInfo.selected_space.space_no}</p>
      </div>

      {/* Payment form */}
      <form onSubmit={handlePaymentSubmit}>
        <label>
          Card Number:
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </label>
        <br />
        <label>
          Expiry Date:
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </label>
        <br />
        <label>
          CVV:
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </label>
        <br />
        <label>
          Name on Card:
          <input
            type="text"
            value={nameOnCard}
            onChange={(e) => setNameOnCard(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default Payment;
