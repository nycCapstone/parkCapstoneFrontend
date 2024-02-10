import { getLanSearchStatus } from "../../redux/landing/landingSearchSlice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import useLogout from "../../hooks/useLogout";
import { Link } from "react-router-dom";

const OnLoadNav = () => {
  const [userName, setUserName] = useState(null);
  const searchStatus = useSelector(getLanSearchStatus);
  const logout = useLogout();

  useEffect(() => {
    // Function to read user name from local storage
    const getUserFromLocalStorage = () => {
      const storedUserName = localStorage.getItem("carvalet_user");
      if (storedUserName) {
        setUserName(storedUserName);
      } else {
        setUserName(null);
      }
    };

    getUserFromLocalStorage();

    const storageEventListener = (event) => {
      if (event.key === "userName") {
        getUserFromLocalStorage();
      }
    };

    window.addEventListener("storage", storageEventListener);

    return () => {
      window.removeEventListener("storage", storageEventListener);
    };
  }, []);

  const signOut = async () => {
    await logout();
  };

  if (userName) {
    return (
      <div className="nav-links">
        <Link className="about" to="/about">
          About Us
        </Link>
        <Link to="/admin" className="nav-link">
          Hi {userName}!
        </Link>
        <Link className="sign-up" onClick={signOut}>
          Sign Out
        </Link>
      </div>
    );
  }

  if (!userName) {
    let args = searchStatus ? "" : "/2";
    return (
      <div className="nav-links">
        <Link className="about" to="/about">
          About Us
        </Link>
        <Link className="log-in" to={userName ? "/admin" : `/login${args}`}>
          Login
        </Link>
        {userName ? (
          <Link className="sign-up" onClick={signOut}>
            Sign Out
          </Link>
        ) : (
          <Link className="sign-up" to="/register">
            Sign Up
          </Link>
        )}
      </div>
    );
  }
};

export default OnLoadNav;
