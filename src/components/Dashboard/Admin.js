import { Link } from "react-router-dom";
import User from "../User";
import { getRoles } from "../../redux/roles/rolesSlice";
import { useSelector, useDispatch } from "react-redux";
import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useEffect } from "react";
import { confirmAddress } from "../../redux/userActions/userActionSlice";
import { formValue } from "../../redux/forms/formsSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError, error } = useGetUserInfoQuery();
  const roles = useSelector(getRoles)

  useEffect(() => {
    if (isSuccess) {
    dispatch(confirmAddress(roles));
    dispatch(formValue(data, roles, isError));
    }
  }, [data])

  let content;
  if (isLoading) {
    content = (
      <section>
        <p>"Loading..."</p>
        <div className="flexGrow">
          <Link to="/home">Home</Link>
        </div>
      </section>
    );
  } else if (isSuccess) {
    content = (
      <section>
        <h1>Admin Page</h1>
        <User userData={data} />
        <div className="flexGrow">
          <Link to="/home">Home</Link>
        </div>
      </section>
    );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }

  return content;
};

export default Admin;
