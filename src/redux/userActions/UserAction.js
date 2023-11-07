import React from "react";
import { Link } from "react-router-dom";
import { useGetUserInfoQuery } from "./userApiSlice";
import Loading from "../../assets/Spinners/Loading";

const UserAction = () => {
  const { data: userData, isLoading, isSuccess, error } = useGetUserInfoQuery();

  if (isLoading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (isSuccess) {
    var roles = userData.roles;
    let userActions = [];

    if (roles?.ClientOnly && !roles.Client.bckgr)
      userActions.push("confirm_client_address");
    if (roles?.Renter && !roles.Client.bckgr)
      userActions.push("confirm_primary_address");
    if (roles?.Renter && !roles.Renter.bckgr)
      userActions.push("confirm_renter_address");

    return (
      <div>
        <ul>
          {userActions?.length > 0 &&
            userActions.map((item, idx) => {
              return userActions.length > 1 && idx > 0 ? (
                <li key={idx}>{item}</li>
              ) : (
                <li key={idx}>
                  <Link to="/admin/confirm-details">{item}</Link>
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>Server Error</p>
      </div>
    );
  }
};

export default UserAction;
