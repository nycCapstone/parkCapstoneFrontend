import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetLandingCache } from "../../../redux/landing/landingSearchSlice";
import { useNewClientPmtMutation } from "../../../redux/checkout/checkoutApiSlice";
import {useFormik} from "formik";
import "./Payment.css";

const Payment = () => {
  //reservation information
  //selected_space {}
  //query_data
  //Array[] space_id, final_price, check_in time, check_out time
  const resInfo = useSelector((state) => state.reservation);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState('')
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [err, setErr] = useState(false);
  const [newClientPmt] = useNewClientPmtMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      nameOnCard: '',
    },
    validate: (values) => {
      const errors = {};

      if (!values.cardNumber) {
        errors.cardNumber = 'Required';
      } else if (!/^\d{16}$/.test(values.cardNumber)) {
        errors.cardNumber = 'Invalid card number';
      }

      if (!values.expiryMonth) {
        errors.expiryMonth = 'Required';
      }

      if (!values.expiryYear) {
        errors.expiryYear = 'Required';
      }

      if (!values.cvv) {
        errors.cvv = 'Required';
      } else if (!/^\d{3,4}$/.test(values.cvv)) {
        errors.cvv = 'Invalid CVV';
      }

      if (!values.nameOnCard) {
        errors.nameOnCard = 'Required';
      }
      console.log(errors)
    },
    onSubmit: (e) => {
      console.log("worked?")
      setExpiryDate(`${expiryMonth}/${expiryYear}`)
      handlePaymentSubmit(e)
   },
  });

  const handlePaymentSubmit = async (e) => {
    console.log("this?")
    if ([cardNumber, expiryDate, cvv, nameOnCard].some(item => item === "")) {
      return;
    }
    await newClientPmt({ data: [expiryDate, resInfo.booking_id] })
      .unwrap()
      .then((res) => {
        if (!res.success) {
          setErr(true);
          return
        }
        dispatch(resetLandingCache());
        navigate(`/client/pmt/sucess/${resInfo.nav_id}/${res.pmt_id}`);
      }).catch(e => console.error(e));
  };

  const handleCardNumberChange= (event) => {
    setCardNumber(event.target.value);
    formik.handleChange(event);
  };

  const handleExpiryMonthChange = (event) => {
    setExpiryMonth(event.target.value);
    formik.handleChange(event);
  };

  const handleExpiryYearChange = (event) => {
    setExpiryYear(event.target.value);
    formik.handleChange(event);
  };
  const handleCvvChange = (event) => {
    setCvv(event.target.value);
    formik.handleChange(event);
  };

  const handleNameChange = (event) => {
    setNameOnCard(event.target.value);
    formik.handleChange(event);
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
      <form className="payment-form" onSubmit={formik.handleSubmit}>
        <label>
          <span className="label-card-name">Name on Card</span>
          <br />
          <input
            type="text"
            id="nameOnCard"
            value={nameOnCard}
            onChange={handleNameChange}
            onBlur={formik.handleBlur}
          />
        </label>
        <label>
          <span className="label-card-num">Card Number</span>
          <br />
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={handleCardNumberChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.cardNumber && formik.errors.cardNumber ? (
          <div style={{ color: 'red' }}>{formik.errors.cardNumber}</div>
        ) : null}
        </label>
        <label>
          <span className="label-card-exp">Expiration Date</span>
          <br />
          <select 
            id="expiryMonth"
            onChange={handleExpiryMonthChange}
            onBlur={formik.handleBlur}
            value={expiryMonth}
          >
            <option value="null">--</option>
            <option value="2">02</option>
            <option value="3">03</option>
            <option value="4">04</option>
            <option value="5">05</option>
            <option value="6">06</option>
            <option value="7">07</option>
            <option value="8">08</option>
            <option value="9">09</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
          {formik.touched.expiryMonth && formik.errors.expiryMonth ? (
          <div style={{ color: 'red' }}>{formik.errors.expiryMonth}</div>
        ) : null}
          <select 
          id="expiryYear" 
          onChange={handleExpiryYearChange}
          onBlur={formik.handleBlur}
          value={expiryYear}
          >
            <option value="null">--</option>            
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
            <option value="32">32</option>
            <option value="33">33</option>
            <option value="34">34</option>
            <option value="35">35</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
          </select>
        </label>
        <br />

        <label>
          <span className="label-card-cvv">CVV (security code)</span>
          <br />
          <input
            type="text"
            id="cvv"
            value={cvv}
            onChange={handleCvvChange}
            onBlur={formik.handleBlur}
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


