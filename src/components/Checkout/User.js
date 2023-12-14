import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CHECK_FOR_EMAIL_URL } from "../../constants/helper/helper";
import { useSelector } from "react-redux";
import { getCLSearchStatus } from "../../redux/client/clientSearchSlice";
import axios from "../../api/axios";
import "./Styles/UserCheckout.css";

const User = ({ userData }) => {
  const [email, setEmail] = useState("");
  const [continueAsGuest, setContinueAsGuest] = useState(false);
  const [register, setRegister] = useState(null);
  const isL = useSelector(getCLSearchStatus);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    await axios
      .get(`${CHECK_FOR_EMAIL_URL}${email}`)
      .then((result) => {
        if (!result.data?.length) {
          setRegister({ email });
        }
        if (result.data?.length) {
          setRegister({ email: null });
        }
      })
      .catch(() => {
        setRegister({ email: "X" });
      });
    setContinueAsGuest(true);
  };
  console.log(userData);
  return (
    <>
      <div className="userinfo-card">
        {!userData?.email ? (
          <div>
            <p className="account-info-header ">Account Info</p>
            <form
              onSubmit={handleSubmit}
              className={continueAsGuest === true ? "user-active" : ""}
            >
              <div className=" input-block">
                <label
                  htmlFor="emailogin"
                  name="email-check-label"
                  className="input-label"
                >
                  Email
                </label>
                <input
                  className="login-input"
                  type="email"
                  id="emailogin"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button type="submit" className="guest-button">
                Continue as Guest
              </button>
            </form>
            <div>
              {continueAsGuest === true && (
                <p
                  className={
                    register !== null && !register.email
                      ? "continue-guest user-active"
                      : "continue-guest"
                  }
                >
                  Checking out as guest <strong>{email}</strong>{" "}
                </p>
              )}
              <Link to="/login/true" className="checkout-singIn">
                Sign In Or Create Account
              </Link>
            </div>
            <div>
              {register && register.email === "X" && (
                <div>
                  <p>Server Error</p>
                </div>
              )}
              {register !== null && !register.email && (
                <div>
                  <p className="registered-error-msg">
                    Already registered with {email}. Please sign in.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="ch-userinfo-list">
            <p className="account-info-header ">Account Info</p>
            <ul>
              <strong>
                <li>{`${userData.first_name} ${userData.last_name} `}</li>
              </strong>
              <li key={1} className="li-email">
                {userData.email}
              </li>
            </ul>
          </div>
        )}
        <div className="app-features">
          <p></p>
        </div>
      </div>

      {/* <div className="us-chk-navigate">
        <button
          type="click"
          className="go-back-link"
          onClick={() =>
            navigate(`${isL ? "/client/search-result" : "/search-result"}`)
          }
        >
          <span className="go-back-icon">&#8678;</span> Go back
        </button>
      </div> */}
    </>
  );
};

export default User;
