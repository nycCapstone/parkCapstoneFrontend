import { useState } from "react";
import { Link } from "react-router-dom";
import { CHECK_FOR_EMAIL_URL } from "../../constants/helper/helper";
import axios from "../../api/axios";
import "./Styles/UserCheckout.css";

const User = ({ userData, setShowUser, showUser }) => {
  const [email, setEmail] = useState("");
  const [continueAsGuest, setContinueAsGuest] = useState(false);
  const [register, setRegister] = useState(null);

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
  return (
    <div className={`usrmodal`} style={{ display: showUser ? "flex" : "none" }}>
      <div className="userinfo-card">
        <button className="usrclose-button" onClick={() => setShowUser(false)}>
          X
        </button>
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
            <p className="account-info-header">Account Info</p>
            <ul className="user-name-email">
              <strong>
                <li>{`${userData.first_name} ${userData.last_name} `}</li>
              </strong>
              <li key={1}>{userData.email}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
