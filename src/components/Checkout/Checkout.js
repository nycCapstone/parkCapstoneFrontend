import { useGetUserInfoQuery } from "../../redux/userActions/userApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Loading from "../../assets/Spinners/Loading";

const Checkout = () => {
  const role = useSelector((state) => !state.roles.hasOwnProperty("Client"));
  const searchResults = useSelector((state) => state.searchResults.data);
  const {
    data: userData,
    isLoading,
    isSuccess,
    error,
    isUninitialized
} = useGetUserInfoQuery({}, {skip: role});    

if (error) {
    return <div>Checkout Api down</div>
}

if (isSuccess || isUninitialized) {
    
    return (
        <>
      <section>

            {userData?.first_name && <p>{userData.first_name}</p>}
            {role && <div>Hello stranger!</div>}
            {JSON.stringify(searchResults)}
        <form>
        </form>
  
      </section>
      </>
    );
    
    
};
if (isLoading) {
    return <Loading/>
}
    
}

export default Checkout;
