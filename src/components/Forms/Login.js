import { useRef, useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { setRole } from "../../redux/roles/rolesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../redux/auth/authApiSlice";
import { setPersist, setAuth } from "../../redux/auth/authSlice";
import "./Styles/login.css";

const Login = () => {
  const persist = useSelector((state) => state.auth.persist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [login] = useLoginMutation();
  let from = location.state?.from?.pathname || "/admin";

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const togglePersist = () => dispatch(setPersist(!persist));

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password })
        .unwrap()
        .then((res) => {
          dispatch(setRole(res));
          dispatch(setAuth(res));
        });
      localStorage.setItem("persist", true);
      navigate("/admin");
    } catch (err) {
      console.error(err);

      if (err?.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else if (err?.response?.status === 500) {
        setErrMsg("Missing Email or Password");
      } else {
        setErrMsg("Login Failed. Please try again.");
      }
      errRef.current.focus();
    }
  };

  return (
    <div>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <section className="logIn">
        <h1 className="header">Log in to CarValet</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>

          <div className="input-block">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={password}
              required
            />
          </div>

          <div className="persistCheck">
            <input
              type="checkbox"
              id="persist"
              onChange={togglePersist}
              checked={persist}
            />
            <label htmlFor="persist">Remember Me</label>
          </div>
          <button className="logIn-button">Log In</button>
        </form>
        <div className="logIn-signUp">
          <p>
            {" "}
            Not registered yet?{" "}
            <span>
              <Link className="register-link" to={"/register"}>
                Sign Up
              </Link>
            </span>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
