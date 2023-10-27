import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/authSlice";
import useRefreshToken from "../../hooks/useRefreshToken";

const PersistLogin = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const ct = useSelector(state => state.auth.accessToken);
  
  useEffect(() => {
      let isMounted = true;
      async function refreshAccessToken() {
          try {
              await refresh();
            } catch (error) {
        // Handle any errors
        dispatch(logOut());
        console.error(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    }
    localStorage.getItem("persist") && !ct
      ? refreshAccessToken()
      : setIsLoading(false);
    return () => (isMounted = false);
  }, []);

  return (
    <>
      {isLoading && !ct ? (
        <>
          <div>Loading...</div>
          <div>Loading...</div>
          <div>Loading...</div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
