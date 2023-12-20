import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNewClientPmtMutation } from "../../../redux/checkout/checkoutApiSlice";
import { useGetUserInfoQuery } from "../../../redux/userActions/userApiSlice";
import { useFormik } from "formik";
import { CiCreditCard1 } from "react-icons/ci";
import ButtonSpinner from "../../../assets/Spinners/ButtonSpinner";
import "./Payment.css";

const Payment = () => {
  const { data: userData } = useGetUserInfoQuery();
  const resInfo = useSelector((state) => state.reservation);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [err, setErr] = useState(false);
  const [newClientPmt] = useNewClientPmtMutation();
  const [showLoad, setShowLoad] = useState(false);
  const navigate = useNavigate();

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
      } else {
        const cardNumberWithoutSpaces = values.cardNumber.replace(/\s/g, "");
        if (!/^\d{16}$/.test(cardNumberWithoutSpaces)) {
          errors.cardNumber = "Invalid card number. Must be 16 digits.";
        } else if (!/^\d+$/.test(cardNumberWithoutSpaces)) {
          errors.cardNumber = "Only numbers are allowed.";
        } else if (cardNumberWithoutSpaces.length > 16) {
          errors.cardNumber = `Maximum 16 digits allowed.`;
        }
      }
      if (!values.expiryMonth) {
        errors.expiryMonth = "*Month required.";
      }

      if (!values.expiryYear) {
        errors.expiryYear = "*Year required.";
      }

      if (!values.cvv) {
        errors.cvv = "*Required";
      } else if (!/^\d{3,4}$/.test(values.cvv)) {
        errors.cvv = "*Invalid CVV";
      }

      if (!values.nameOnCard) {
        errors.nameOnCard = "*Required";
      } else if (values.nameOnCard.length < 2) {
        errors.nameOnCard = "*Name must be atleast 2 characters";
      }
      return errors;
    },
    onSubmit: async (values) => {
      setShowLoad(true);
      await newClientPmt({
        data: [
          `${values.expiryMonth}/${values.expiryYear}`,
          resInfo.booking_id,
        ],
        email: [
          resInfo.booking_id,
          resInfo.selected_space.prop_address,
          [
            resInfo.query_data[0],
            `${new Date(resInfo.query_data[2]).toLocaleDateString()} ${new Date(
              resInfo.query_data[2],
            ).toLocaleTimeString()}`,
          ],
          userData.email,
        ],
      })
        .unwrap()
        .then((res) => {
          if (!res.success) {
            setErr(true);
            return;
          }
          navigate(`/client/pmt/success/${resInfo.nav_id}/${res.pmt_id}`);
        })
        .catch((e) => console.error(e))
        .finally(() => setShowLoad(false));
    },
  });

  const handleCardNumberChange = (event) => {
    setCardNumber(event.target.value);
    const { value } = event.target;
    let numeric = value.replace(/\D/g, ""); // remove non numeric

    const formattedValue = numeric
      .replace(/\s/g, "") // Remove existing spaces
      .match(/.{1,4}/g); // Match every 4 characters
    if (formattedValue != null) {
      if (numeric.length <= 16) {
        formik.handleChange({
          target: { name: "cardNumber", value: formattedValue.join(" ") },
        });
      }
    } else
      formik.handleChange({ target: { name: "cardNumber", value: value } });
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
    const { value } = event.target;
    const numericValue = value.replace(/\D/g, "");
    setCvv(numericValue);
    if (numericValue.length <= 3) {
      formik.handleChange({ target: { name: "cvv", value: numericValue } });
    }
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
              placeholder="John Doe"
              value={nameOnCard}
              onChange={handleNameChange}
              onBlur={formik.handleBlur}
            />
          </div>

          {formik.touched.nameOnCard && formik.errors.nameOnCard ? (
            <p className="error-payment-msg">{formik.errors.nameOnCard}</p>
          ) : null}

          <div className="input-block">
            <label className="input-label">Card Number</label>
            <div className="credit-info">
              <CiCreditCard1 className="creditCardIcon" />
              <input
                placeholder="1234 1234 1234 1234"
                id="cardNumber"
                className="login-input"
                type="text"
                value={formik.values.cardNumber}
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
              type="text"
              id="cvv"
              value={formik.values.cvv}
              placeholder="123"
              onChange={handleCvvChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.cvv && formik.errors.cvv ? (
            <p className="error-payment-msg ">{formik.errors.cvv}</p>
          ) : null}

          <button className="payment-button" type="submit">
            {showLoad ? (
              <ButtonSpinner />
            ) : (
              <>Pay ${Number(resInfo.selected_space.final_price) + 5}</>
            )}
          </button>
        </form>
        <div className="purchase-details">
          <div>{err && <div className="error-message">Error</div>}</div>

          <p className="pymt-details-summary">Parking Summary</p>
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
                    (item) => item.space_id === resInfo.booking_space_id,
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
