import { useState } from "react";
import { Link } from "react-router-dom";
import { CHECK_FOR_EMAIL_URL } from "../../constants/helper/helper";
import axios from "../../api/axios";

const User = ({ userData }) => {
  const [email, setEmail] = useState("");
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
      .catch((e) => {
        setRegister({ email: "X" });
      });
  };

  return (
    <div style={{ backgroundColor: userData?.email ? "lightgray" : "" }}>
      <div>
        <i>1</i>
        <h3>Account Info</h3>
      </div>
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
            <Link to="/login">Sign in or Create Account</Link>
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
        <div>
          <ul>
            <li key={1}>{userData.email}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default User;