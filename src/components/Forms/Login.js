import { useRef, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { setRole } from '../../redux/roles/rolesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../../redux/auth/authApiSlice';
import { setPersist, setAuth } from '../../redux/auth/authSlice';
import { confirmAddress } from '../../redux/userActions/userActionSlice';
import { formValue } from '../../redux/forms/formsSlice';

const Login = () => {
    const persist = useSelector(state => state.auth.persist);
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const location = useLocation();
    const [login, { isLoading }] = useLoginMutation()
    let from = location.state?.from?.pathname || "/admin";

    const userRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const togglePersist = () => dispatch(setPersist(!persist));
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login({ email, password, }).unwrap().then(res => {
                dispatch(setRole(res));
                dispatch(setAuth(res));
                dispatch(confirmAddress(res.roles));
                dispatch(formValue(res, res.roles, false));
            })

            setEmail('');
            setPwd('');
            localStorage.setItem("persist", true);
            navigate("/home");
            //navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 500) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (

        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">email:</label>
                <input
                    type="email"
                    id="email"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    value={password}
                    required
                />
                <div className="persistCheck">
                    <input
                        type="checkbox"
                        id="persist"
                        onChange={togglePersist}
                        checked={persist}
                    />
                    <label htmlFor="persist">Remember Me</label>
                </div>
                <button>Sign In</button>
            </form>
            <p>
                Need an Account?<br />
                <span className="line">
                    <Link to="/register">Sign Up</Link>
                </span>
            </p>
        </section>

    )
}

export default Login
