import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CHECK_FOR_EMAIL_URL } from "../../constants/helper/helper";
import { useSelector } from "react-redux";
import { getCLSearchStatus } from "../../redux/client/clientSearchSlice";
import axios from "../../api/axios";
import "./Styles/UserCheckout.css";

const User = ({ userData }) => {
  const [email, setEmail] = useState("");
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
  };

  return (
    <>
      <div className="userinfo-card">
        <div className="ch-numicon">
          <i>1</i>
        </div>
        <h3>Account Info</h3>
        {!userData?.email && (
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="emailogin" name="email-check-label">
                Email
              </label>
              <input
                type="email"
                id="emailogin"
                placeholder="....."
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Continue as Guest</button>
            </form>
            <div>
              <Link to="/login/true">Sign in or Create Account</Link>
            </div>
            <div>
              {register && register.email === "X" && (
                <div>
                  <p>Server Error</p>
                </div>
              )}
              {register !== null && !register.email && (
                <div>
                  <p>already registered with: {email}</p>
                </div>
              )}
              {register && register?.email !== "X" && (
                <div>
                  <Link to="/register">Register Now</Link>
                </div>
              )}
            </div>
          </div>
        )}
        {userData?.email && (
          <div className="ch-userinfo-list">
            <ul>
              <li key={1}>{userData.email}</li>
            </ul>
          </div>
        )}
      </div>
      <div className="us-chk-navigate">
        <button
          type="click"
          className="go-back-link"
          onClick={() =>
            navigate(`${isL ? "/client/search-result" : "/search-result"}`)
          }
        >
          <span className="go-back-icon">&#8678;</span> Go back
        </button>
      </div>
    </>
  );
};

export default User;
