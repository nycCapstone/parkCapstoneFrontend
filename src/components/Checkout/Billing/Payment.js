import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetLandingCache } from "../../../redux/landing/landingSearchSlice";
import { useNewClientPmtMutation } from "../../../redux/checkout/checkoutApiSlice";
import { useGetUserInfoQuery } from "../../../redux/userActions/userApiSlice";
import { useFormik } from "formik";
import { CiCreditCard1 } from "react-icons/ci";
import "./Payment.css";

const Payment = () => {
  //reservation information
  //selected_space {}
  //query_data
  //Array[] space_id, final_price, check_in time, check_out time
  const { data: userData } = useGetUserInfoQuery();
  const resInfo = useSelector((state) => state.reservation);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [err, setErr] = useState(false);
  const [newClientPmt] = useNewClientPmtMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      nameOnCard: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.cardNumber) {
        errors.cardNumber = "Required";
      } else if (values.cardNumber.length < 19) {
        errors.cardNumber = "Invalid card number.Must be 16 digits.";
      }

      if (!values.expiryMonth) {
        errors.expiryMonth = "*Month required.";
      }

      if (!values.expiryYear) {
        errors.expiryYear = "*Year required.";
      }

      if (!values.cvv) {
        errors.cvv = "Required";
      } else if (!/^\d{3,4}$/.test(values.cvv)) {
        errors.cvv = "*Invalid CVV";
      }

      if (!values.nameOnCard) {
        errors.nameOnCard = "Required";
      } else if (values.nameOnCard.length < 2) {
        errors.nameOnCard = "*Name must be atleast 2 characters";
      }
      return errors;
    },
    onSubmit: async (values) => {
      console.log();
      if (
        ![cardNumber, expiryDate, cvv, nameOnCard].some((item) => item === "")
      ) {
        return;
      }
      await newClientPmt({
        data: [
          `${values.expiryMonth}/${values.expiryYear}`,
          resInfo.booking_id,
        ],
        email: [
          resInfo.booking_id,
          resInfo.selected_space.prop_address,
          resInfo.query_data,
          userData.email
        ]
      })
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
    },
  });

  const handleCardNumberChange = (event) => {
    let inputValue = event.target.value.replace(/\s/g, "");
    inputValue = inputValue
      .replace(/(\d{4})/g, "$1 ")
      .trim()
      .substring(0, 19);
    setCardNumber(inputValue);
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
    <div className="checkout">
      <div className="payment-container">
        {/* Payment form */}
        <form className="payment-form" onSubmit={formik.handleSubmit}>
          <p className="billing-header">Payment Details</p>
          <div className="input-block">
            <label className="input-label">Name on Card</label>
            <input
              className="login-input"
              id="nameOnCard"
              type="text"
              value={nameOnCard}
              onChange={handleNameChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {formik.touched.nameOnCard && formik.errors.nameOnCard ? (
            <p className="error-payment-msg">*{formik.errors.nameOnCard}</p>
          ) : null}

          <div className="input-block">
            <label className="input-label">Card Number</label>
            <div className="credit-info">
              <CiCreditCard1 className="creditCardIcon" />
              <input
                placeholder="1234 5678 9012 3456"
                id="cardNumber"
                className="login-input"
                type="text"
                value={cardNumber}
                onChange={handleCardNumberChange}
                onBlur={formik.handleBlur}
              />
            </div>
          </div>

          {formik.touched.cardNumber && formik.errors.cardNumber ? (
            <p className="error-payment-msg">*{formik.errors.cardNumber}</p>
          ) : null}

          <div className="input-block">
            <label className="input-label">Expiration Date</label>
            <div className="card-select-month-year">
              <select
                className="select-block"
                id="expiryMonth"
                onChange={handleExpiryMonthChange}
                onBlur={formik.handleBlur}
                value={expiryMonth}
              >
                <option value="">Month</option>
                <option value="2">01</option>
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
              <select
                className="select-block"
                id="expiryYear"
                onChange={handleExpiryYearChange}
                onBlur={formik.handleBlur}
                value={expiryYear}
              >
                <option value="">Year</option>
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
            </div>
          </div>
          <div className="month-year-error">
            <div>
              {formik.touched.expiryYear && formik.errors.expiryYear ? (
                <p className="error-payment-msg">{formik.errors.expiryYear}</p>
              ) : null}
            </div>
            <div>
              {formik.touched.expiryMonth && formik.errors.expiryMonth ? (
                <p className="error-payment-msg">{formik.errors.expiryMonth}</p>
              ) : null}
            </div>
          </div>

          <div className="input-block">
            <label className="input-label">CVV (security code)</label>
            <input
              className="login-input"
              placeholder="eg: 123"
              id="cvv"
              type="text"
              value={cvv}
              onChange={handleCvvChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {formik.touched.cvv && formik.errors.cvv ? (
            <p className="error-payment-msg ">{formik.errors.cvv}</p>
          ) : null}

          <button className="payment-button" type="submit">
            Pay ${Number(resInfo.selected_space.final_price) + 5}
          </button>
        </form>
        <div className="purchase-details">
          <div>{err && <div className="error-message">Error</div>}</div>
          {/* Display details related to the item being purchased */}
          <p className="summary">Parking Summary</p>
          <div className="firstPayment">
            <p className="location">
              <span className="category-location">Parking Location:</span>{" "}
              <strong>
                {resInfo.selected_space.prop_address.slice(0, -5)}
              </strong>
            </p>
            <p className="space-number">
              <span className="category-space-number">Space No:</span>{" "}
              <strong>
                {
                  resInfo.query_data[0].find(
                    (item) => item.space_id === resInfo.booking_space_id
                  )?.space_no
                }
              </strong>
            </p>
          </div>
          <div className="secondPayment">
            <div className="subTotal">
              <label className="price">Sub Total:</label>
              <span>${resInfo.selected_space.final_price}</span>
            </div>
            <div className="serviceFee">
              <label>Service Fee</label>
              <span>$5.00</span>
            </div>
            <div className="total">
              <label>
                <strong>Total:</strong>
              </label>
              <span>
                <strong>
                  ${Number(resInfo.selected_space.final_price) + 5}
                </strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
