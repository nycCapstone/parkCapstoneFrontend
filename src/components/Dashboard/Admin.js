import { Link } from "react-router-dom";
import User from "../User";
import { useSelector, useDispatch } from "react-redux";
import { useGetInfoQuery } from "../../redux/userActions/userApiSlice";
import { useEffect } from "react";
import { confirmAddress } from "../../redux/userActions/userActionSlice";
import { formValue } from "../../redux/forms/formsSlice";
import { setAuth } from "../../redux/auth/authSlice";
import { useState } from "react";
import { setRole } from "../../redux/roles/rolesSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const { data, error, isLoading } = useGetInfoQuery();
  const roles = useSelector(state => state.roles);
  
  useEffect(() => {
    if (!isLoading) {
            dispatch(setRole(data));
            dispatch(setAuth(data));
            dispatch(confirmAddress(roles));
            dispatch(formValue(data, roles, false));
    }  
  }, [isLoading])

  if (isLoading) {
    return (
      <section>
        <p>"Loading..."</p>
        <div className="flexGrow">
          <Link to="/home">Home</Link>
        </div>
      </section>
    );
}
if (error) return <div><p>error</p></div>;
return (
    <section>
      <h1>Admin Page</h1>
      <User userData={data} />
      <p style={{fontSize: '8px'}}>{JSON.stringify(roles)}</p>
      <div className="flexGrow">
        <Link to="/home">Home</Link>
      </div>
    </section>
  );
};

export default Admin;
