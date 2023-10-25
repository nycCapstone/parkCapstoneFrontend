import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";
import { Link } from "react-router-dom";

const EMAIL_REGEX =
  /([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+/;
const PWD_REGEX = /^(?=.*[A-Z])(?=.*\d).{7,24}$/;
const NAME_REGEX = /^[A-Za-z'-]+$/;
const ADDRESS_REGEX = /^[0-9A-Za-z\s,-./\\#]+$/;
const CITY_REGEX = /^[A-Za-z\s'-.]+$/;
const STATE_REGEX = /^[A-Z]{2}$/;
const REGISTER_URL = "/auth/create-user";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [first_name, setFirstName] = useState("");
  const [validName, setValidName] = useState(false);

  const [last_name, setLastName] = useState("");

  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);

  const [city, setCity] = useState("");
  const [validCity, setValidCity] = useState(false);

  const [state, setState] = useState("");
  const [validState, setValidState] = useState(false);

  const [password, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [is_renter, setRenter] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    setValidName(NAME_REGEX.test(first_name));
    setValidName(NAME_REGEX.test(last_name));
    setValidAddress(ADDRESS_REGEX.test(address));
    setValidCity(CITY_REGEX.test(city));
    setValidState(STATE_REGEX.test(state));
  }, [email, first_name, last_name, address, city, state]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }
    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({
          email,
          first_name,
          last_name,
          address: address.trim() + " " + city + " " + state,
          password,
          is_renter,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // TODO: remove console.logs before deployment
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response))
      setSuccess(email);
      //clear state and controlled inputs
      setEmail("");
      setPwd("");
      setAddress("");
      setCity("");
      setState("");
      setRenter(false);
      setMatchPwd("");
    } catch (err) {
      if (!err?.message) {
        setErrMsg("No Server Response");
      } else if (err?.response) {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1>
          <p>
            Confirmation email sent to {success}.
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email:
              <FontAwesomeIcon
                icon={faCheck}
                className={validEmail ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validEmail || !email ? "hide" : "invalid"}
              />
            </label>
            <input
              type="email"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && email && !validEmail ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must include @.
              <br />
            </p>

            <label htmlFor="first_name">
              First Name:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !first_name ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="first_name"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setFirstName(e.target.value)}
              value={first_name}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <label htmlFor="last_name">
              Last Name:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !last_name ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="last_name"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setLastName(e.target.value)}
              value={last_name}
              required
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <label htmlFor="address">
              Address:
              <FontAwesomeIcon
                icon={faCheck}
                className={validAddress ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validAddress || !address ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="address"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              required
              aria-invalid={validAddress ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <label htmlFor="city">
              City:
              <FontAwesomeIcon
                icon={faCheck}
                className={validCity ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validCity || !city ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="city"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setCity(e.target.value)}
              value={city}
              required
              aria-invalid={validCity ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <label htmlFor="state">
              State:
              <FontAwesomeIcon
                icon={faCheck}
                className={validState ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validState || !state ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              id="state"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setState(e.target.value)}
              value={state}
              required
              aria-invalid={validState ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPwd || !password ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={password}
              required
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <p
              id="pwdnote"
              className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              7 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, and a number
              <br />
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch && matchPwd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              id="confirm_pwd"
              onChange={(e) => setMatchPwd(e.target.value)}
              value={matchPwd}
              required
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                matchFocus && !validMatch ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
            <div className="containter mt-1">
              <input // prettier-ignore
                type="check"
                id="custom-switch"
                label="Renter?"
                checked={is_renter}
                onChange={() => setRenter(!is_renter)}
              />
            </div>

            <button
              disabled={
                !validEmail ||
                !validPwd ||
                !validMatch ||
                !validAddress ||
                !validCity ||
                !validState ||
                !validName
                  ? true
                  : false
              }
            >
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Sign In</Link>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
