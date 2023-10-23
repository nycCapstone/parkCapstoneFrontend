import { useRef, useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { setRole, modifyRole } from '../../redux/roles/rolesSlice';

import axios from '../../api/axios';
const LOGIN_URL = '/auth/login';

const Login = () => {
    const { auth, setAuth, persist, setPersist, setUserData } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
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

    const togglePersist = () => setPersist(prev => !prev);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (auth.email === email) {
            errRef.current.focus();
            setErrMsg(`logged in with ${auth.email}`);
            return;
        }
        try {
            const response = await axios.post(LOGIN_URL,
                { email, password, },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            setRole(response.data);
            delete response.data.roles;
            setAuth({ accessToken: response.data.accessToken, email: response.data.email, id: response.data.id });
            delete response.data.accessToken;
            setUserData(response.data);
            modifyRole(response.data);
            setEmail('');
            setPwd('');
            localStorage.setItem("persist", true);
            navigate(from, { replace: true });
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
